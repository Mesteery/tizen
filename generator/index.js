import { mkdir, readdir, stat, writeFile, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cheerio from 'cheerio';
import chalk from 'chalk';
import prettier from 'prettier';
import webidl2ts from './webidl2ts.js';

const noop = () => {};

const platforms = ['mobile', 'tv', 'wearable'];

const dirname = fileURLToPath(new URL('..', import.meta.url));
const start = process.hrtime.bigint();

if (process.argv[2] === '--clear' || process.argv[2] === '-c') {
	await rm(join(dirname, 'types'), { recursive: true });
}

await mkdir(join(dirname, 'types')).catch(noop);

const prettierOptions = await prettier.resolveConfig(fileURLToPath(import.meta.url));

const versionsPath = join(dirname, 'tizen-docs/docs/application/web/api');
for (const versionFile of await readdir(versionsPath, { withFileTypes: true })) {
	const { name: version } = versionFile;
	if (!versionFile.isDirectory() || !version.includes('.')) continue;
	if (await stat(join(dirname, 'types', version)).catch(noop)) {
		process.stdout.write(chalk.yellow`Typings for v${version} already exists, skipping.\n`);
		continue;
	}

	await mkdir(join(dirname, 'types', version)).catch(noop);
	const platformsPath = join(versionsPath, version, 'device_api');
	for (const platform of await readdir(platformsPath)) {
		if (!platforms.includes(platform)) continue;

		const dirpath = join(dirname, 'types', version, platform);
		await mkdir(dirpath).catch(noop);
		process.stdout.write(chalk.blue.bold`\n\nFetching and creating typings of ${platform} v${version}:`);
		const filesPath = join(platformsPath, platform, 'tizen');
		for (const file of await readdir(filesPath)) {
			if (!file.endsWith('.html')) continue;

			const typeName = file.slice(0, -5);
			process.stdout.write(` ${typeName}`);
			const $ = cheerio.load(await readFile(join(filesPath, file), 'utf8'));
			const baseidl = $('#full-webidl ~ .webidl').text();
			const idl = baseidl
				.replace(/^module\s+\w+\s*{(.+)}\s*;$/s, '$1')
				.replace(/ implements LibTeecManagerObject;/gs, '')
				.replace(/long statusCode = 0/gs, 'long statusCode')
				.replace(/const DOMString BASE_UUID = "[-0-9a-fA-F]+";/gs, 'static readonly attribute BluetoothUUID BASE_UUID;')
				.replace(/\w+\s+implements\s+\w+\s*;/gs, '')
				.replace(/([^\w])\[\](\s*\w+\s*);/gs, '$1sequence<any> $2;')
				.replace(/attribute(\s+)(\w+\s+\w+\s*)\[\](\??\s*\w+);/gs, 'attribute$1FrozenArray<$2>$3;')
				.replace(/(\w+\s*\(.*?\))\s*(?:get)?raises\s*\(\w*\)/gs, '$1')
				.replace(/(attribute\s+(?:unsigned\s+)?(?:\w+\s+)?\w+\??\s+\w+)\s+(?:get)?raises\s*\(\w*\)/gs, '$1')
				.replace(/ \? /g, ' any ')
				.replace(/attribute(\s+)(\w+)\[\](\??\s*\w+);/gs, 'attribute$1FrozenArray<$2>$3;')
				.replace(/(\w+)\[\]/gs, 'sequence<$1>')
				.replace(/toString/g, 'tmp__toString')
				.replace(/unsigned sequence<(\w+)>/g, 'sequence<unsigned $1>');
			let types;
			try {
				types = webidl2ts(idl);
			} catch (error) {
				console.error(
					`\n${chalk.bold('Base WebIDL:')}\n%s\n\n${chalk.bold('Transformed WebIDL:')}\n%s\n\n%O`,
					chalk.red(baseidl),
					chalk.green(idl),
					error,
				);
				process.exit(1);
			}
			writeFile(
				join(dirpath, `${typeName}.d.ts`),
				prettier.format(types.replace(/tmp__toString/g, 'toString'), {
					...prettierOptions,
					parser: 'typescript',
				}),
			);
		}
	}
}

const total = Number(process.hrtime.bigint() - start);
console.log(chalk.blueBright`\nDone in ${total / 1e9} seconds.`);
