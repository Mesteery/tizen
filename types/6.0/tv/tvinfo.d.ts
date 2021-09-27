export {};
declare global {
	type CaptionValue =
		| CaptionState
		| CaptionMode
		| CaptionFontSize
		| CaptionFontStyle
		| CaptionColor
		| CaptionOpacity
		| CaptionEdge
		| CaptionStyle;
	type CaptionInfoKey =
		| 'CAPTION_ONOFF_KEY'
		| 'CAPTION_MODE_KEY'
		| 'CAPTION_FONT_SIZE_KEY'
		| 'CAPTION_FONT_STYLE_KEY'
		| 'CAPTION_FONT_COLOR_KEY'
		| 'CAPTION_FONT_OPACITY_KEY'
		| 'CAPTION_BG_COLOR_KEY'
		| 'CAPTION_BG_OPACITY_KEY'
		| 'CAPTION_EDGE_TYPE_KEY'
		| 'CAPTION_EDGE_COLOR_KEY'
		| 'CAPTION_WINDOW_COLOR_KEY'
		| 'CAPTION_WINDOW_OPACITY_KEY'
		| 'CAPTION_STYLE_KEY';
	type CaptionState = 'CAPTION_OFF' | 'CAPTION_ON';
	type CaptionMode =
		| 'CAPTION_MODE_DEFAULT'
		| 'CAPTION_MODE_SERVICE1'
		| 'CAPTION_MODE_SERVICE2'
		| 'CAPTION_MODE_SERVICE3'
		| 'CAPTION_MODE_SERVICE4'
		| 'CAPTION_MODE_SERVICE5'
		| 'CAPTION_MODE_SERVICE6'
		| 'CAPTION_MODE_CC1'
		| 'CAPTION_MODE_CC2'
		| 'CAPTION_MODE_CC3'
		| 'CAPTION_MODE_CC4'
		| 'CAPTION_MODE_TEXT1'
		| 'CAPTION_MODE_TEXT2'
		| 'CAPTION_MODE_TEXT3'
		| 'CAPTION_MODE_TEXT4';
	type CaptionFontSize =
		| 'CAPTION_SIZE_DEFAULT'
		| 'CAPTION_SIZE_SMALL'
		| 'CAPTION_SIZE_STANDARD'
		| 'CAPTION_SIZE_LARGE'
		| 'CAPTION_SIZE_EXTRA_LARGE';
	type CaptionFontStyle =
		| 'CAPTION_FONT_DEFAULT'
		| 'CAPTION_FONT_STYLE0'
		| 'CAPTION_FONT_STYLE1'
		| 'CAPTION_FONT_STYLE2'
		| 'CAPTION_FONT_STYLE3'
		| 'CAPTION_FONT_STYLE4'
		| 'CAPTION_FONT_STYLE5'
		| 'CAPTION_FONT_STYLE6'
		| 'CAPTION_FONT_STYLE7';
	type CaptionColor =
		| 'CAPTION_COLOR_DEFAULT'
		| 'CAPTION_COLOR_WHITE'
		| 'CAPTION_COLOR_BLACK'
		| 'CAPTION_COLOR_RED'
		| 'CAPTION_COLOR_GREEN'
		| 'CAPTION_COLOR_BLUE'
		| 'CAPTION_COLOR_YELLOW'
		| 'CAPTION_COLOR_MAGENTA'
		| 'CAPTION_COLOR_CYAN';
	type CaptionOpacity =
		| 'CAPTION_OPACITY_SOLID'
		| 'CAPTION_OPACITY_FLASHING'
		| 'CAPTION_OPACITY_TRANSLUCENT'
		| 'CAPTION_OPACITY_TRANSPARENT'
		| 'CAPTION_OPACITY_DEFAULT';
	type CaptionEdge =
		| 'CAPTION_EDGE_NONE'
		| 'CAPTION_EDGE_RAISED'
		| 'CAPTION_EDGE_DEPRESSED'
		| 'CAPTION_EDGE_UNIFORM'
		| 'CAPTION_EDGE_DROP_SHADOWED';
	type CaptionStyle = 'CAPTION_STYLE_DEFAULT' | 'CAPTION_STYLE_BOLD' | 'CAPTION_STYLE_ITALIC';
	interface TVInfoManagerObject {
		tvinfo: TVInfoManager;
	}
	interface Tizen extends TVInfoManagerObject {}

	interface TVInfoManager {
		getCaptionValue(key: CaptionInfoKey): CaptionValue;
		addCaptionValueChangeListener(key: CaptionInfoKey, callback: CaptionValueChangeCallback): number;
		removeCaptionValueChangeListener(watchId: number): void;
	}

	interface CaptionValueChangeCallback {
		onchanged(key: CaptionInfoKey, value: CaptionValue): void;
	}
}
