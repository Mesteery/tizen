// Source: https://github.com/cancerberoSgx/webidl2ts

import { format, inspect } from 'node:util';
import webidl2 from 'webidl2';

const INDENT = '  ';

export default function webidl2ts(unparsed) {
	return printIDLDefinitions(webidl2.parse(unparsed));
}

function printIDLArgument(arg) {
	return `${arg.name}${arg.optional ? '?' : ''}: ${printIDLType(arg.idlType)}`;
}

function printIDLArguments(args) {
	return args.map(printIDLArgument).join(', ');
}

function printIDLAttributeMember(idlAttributeMember) {
	return `${INDENT}${idlAttributeMember.name}: ${printIDLType(idlAttributeMember.idlType)};`;
}

function printIDLConstMember(idlConstMember) {
	return `${INDENT}static readonly ${idlConstMember.name}: ${
		idlConstMember.value?.value || printIDLType(idlConstMember.idlType)
	};`;
}

function printIDLOperationMember(idlMember) {
	const prefix = { getter: 'get ', setter: 'set ' }[idlMember.special?.value] || '';
	return `${INDENT}${prefix}${idlMember.body.name?.value || ''}(${printIDLArguments(
		idlMember.body.arguments,
	)}): ${printIDLType(idlMember.body.idlType)};`;
}

function printIDLDefinition(idlDefinition) {
	switch (idlDefinition.type) {
		case 'dictionary':
			return printIDLDictionary(idlDefinition);
		case 'enum':
			return printIDLEnum(idlDefinition);
		case 'interface':
			return printIDLInterface(idlDefinition);
		case 'typedef':
			// NOTE(mroberts): WebIDL cannot represent a type which is an empty Array,
			// nor can it represent "pairs" (e.g., an Array of length two); so we
			// special case these here.
			if (idlDefinition.name === 'EmptyArray' || idlDefinition.name === 'PairOfIDLTypes') {
				return null;
			}
			return printIDLTypedef(idlDefinition);
		case 'eof':
			return '';
		default:
			throw new Error(`I don't know how to print ${idlDefinition.type}s`);
	}
}

function printIDLDefinitions(idlDefinitions) {
	const lines = idlDefinitions.map(printIDLDefinition).filter(Boolean);
	return `export {}\ndeclare global {
${lines
	.flatMap((chunk) => chunk.split('\n').map((line) => INDENT + line))
	.join('\n')
	.trimEnd()}
}`;
}

function printIDLDictionary(idlDictionary) {
	return `interface ${idlDictionary.name} {
${idlDictionary.members
	.map((member) => `${INDENT}${member.name}${member.required ? '' : '?'}: ${printIDLType(member.idlType)};`)
	.join('\n')}
};
`;
}

function printIDLEnum(idlEnum) {
	return `type ${idlEnum.name} = ${idlEnum.values.map(({ value }) => inspect(value)).join(' | ')};`;
}

function printIDLInterface(idlInterface) {
	const constructor = idlInterface.extAttrs?.items.find((extAttr) => extAttr.name === 'Constructor');
	const hasStatic = idlInterface.members.some((member) => member.type === 'const');
	let out = `${hasStatic || constructor ? 'class' : 'interface'} ${idlInterface.name}${
		idlInterface.inheritence ? ` extends ${idlInterface.inheritence.name}` : ''
	} {\n`;
	if (constructor) {
		out += `${INDENT}constructor(${printIDLArguments(constructor.arguments || [])});\n`;
	}
	if (idlInterface.members.length) {
		out += printIDLMembers(idlInterface.members);
	}
	out += '\n}\n';

	const mixin =
		idlInterface.name === 'TizenObject' ? 'Window' : idlInterface.name.endsWith('ManagerObject') ? 'Tizen' : undefined;

	if (mixin) {
		out += `interface ${mixin} extends ${idlInterface.name} {}\n`;
	}
	if (mixin === 'Window') {
		out += 'const tizen: Tizen;';
	}

	return out;
}

function printIDLMember(idlMember) {
	switch (idlMember.type) {
		case 'attribute':
			return printIDLAttributeMember(idlMember);
		case 'operation':
			return printIDLOperationMember(idlMember);
		case 'const':
			return printIDLConstMember(idlMember);
		default:
			throw new Error(format("I don't know how to print member type: %o", idlMember));
	}
}

function printIDLMembers(idlMembers) {
	return idlMembers.map(printIDLMember).join('\n');
}

function printIDLType(idlType) {
	let before = '';
	let after = '';
	if (idlType.generic) {
		before = `${nativeGenerics[idlType.generic.value] || idlType.generic.value}<${before}`;
		after += '>';
	}
	if (idlType.nullable) after += ' | null';
	if (typeof idlType.idlType === 'string') {
		return `${before}${nativeTypes[idlType.idlType] || idlType.idlType}${after}`;
	} else if (Array.isArray(idlType.idlType)) {
		return `${before}${idlType.idlType.map(printIDLType).join(' | ')}${after}`;
	}
	return `${before}${printIDLType(idlType.idlType)}${after}`;
}

const nativeGenerics = {
	EmptyArray: '[]',
	PairOfIDLTypes: '[IDLType, IDLType]',
	sequence: 'Array',
	FrozenArray: 'Array',
};

const nativeTypes = {
	DOMString: 'string',
	// NOTE(mroberts): WebIDL cannot represent a type which is an empty Array,
	// nor can it represent "pairs" (e.g., an Array of length two); so we
	// special case these here.
	EmptyArray: '[]',
	PairOfIDLTypes: '[IDLType, IDLType]',
	sequence: 'Array',
	FrozenArray: 'Array',
	long: 'number',
	float: 'number',
	'long long': 'number',
	'unsigned long long': 'number',
	'unsigned long': 'number',
	'unsigned short': 'number',
	double: 'number',
	short: 'number',
	octet: 'number',
	byte: 'number',
};

function printIDLTypedef(idlTypedef) {
	if (Array.isArray(idlTypedef.idlType.idlType)) {
		return `type ${idlTypedef.name} = ${idlTypedef.idlType.idlType
			.map((idlType) => printIDLType(idlType))
			.join(' | ')};`;
	} else if (typeof idlTypedef.idlType.idlType === 'string') {
		const content = nativeTypes[idlTypedef.idlType.idlType] || idlTypedef.idlType.idlType;
		// "Type alias <idlTypedef.name> circularly references itself.""
		if (idlTypedef.name === content) return '';
		return `type ${idlTypedef.name} = ${content};`;
	}
	throw new Error(`I only know how to print typedefs for unions`);
}
