

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sentry1 {
    //% block="Sentry1 init port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        if (Generator.board === 'esp32') {
            Generator.addImport("from mpython import *");
        }
        else if (Generator.board === 'microbit') {
            Generator.addImport("from microbit import *");
        }

        Generator.addImport("from Sentry import *");
        Generator.addDeclaration(`sentry1Object`, `sentry1 = Sentry1(${addr})`, true);
        Generator.addCode(`sentry1.begin(${mode})`);
    }

    //% block="Sentry1 [VISION_STA] vision [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;

        if (vision_sta == "ON") {
            Generator.addCode(`sentry1.VisionBegin(${vision_type})`);
        } else {
            Generator.addCode(`sentry1.VisionEnd(${vision_type})`);
        }
    }

    //% block="Sentry1 set [VISION_TYPE] Param [NUM]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    export function SetParamNum(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        Generator.addCode(`sentry1.SetParamNum(${vision_type},${num})`);
    }

    //% block="Sentry1 set color parameter [NUM] ROI area center point abscissa [XVALUE] ordinate [YVALUE] width [WIDTH] height [HIGHT]"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=160
    //% YVALUE.shadow="number"   YVALUE.defl=120
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    export function SetColorParam(parameter: any) {

        let num = parameter.NUM.code;
        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addCode(`sentry1.SetParam(sentry_vision_e.kVisionColor,[${x}, ${y}, ${w}, ${h}, 0],${num})`);
    }

    //% block="Sentry1 set color block detection parameter [NUM] minimum width [WIDTH] minimum height [HIGHT] to detect color [COLOR_LABLE]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=8
    //% HIGHT.shadow="number"   HIGHT.defl=8
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {

        let num = parameter.NUM.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addCode(`sentry1.SetParam(sentry_vision_e.kVisionBlob,[0, 0, ${w}, ${h}, ${l}],${num})`);
    }

    //% block="Sentry1 Set the LED algorithm to detect a color of [LED_COLOR1] and not to detect a color of [LED_COLOR2]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% LED_COLOR1.shadow="dropdown" LED_COLOR1.options="LED_COLOR"
    //% LED_COLOR2.shadow="dropdown" LED_COLOR2.options="LED_COLOR"     
    export function LedSetColor(parameter: any) {
        let color1 = parameter.LED_COLOR1.code;
        let color2 = parameter.LED_COLOR2.code;

        Generator.addCode(`sentry1..LedSetColor(${color1},${color2});`);
    }

    //% block="Sentry1 Set camera [AWB]" blockType="command"
    //% SENTRY.shadow="dropdown" SENTRY.options="SENTRY"
    //% AWB.shadow="dropdown" AWB.options="AWB" 
    export function CameraSetAwb(parameter: any) {
        let awb = parameter.AWB.code;
        Generator.addCode(`sentry1..CameraSetAwb(${awb})`);
    }

    //% block="Sentry1 get vision [VISION_TYPE] status" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"    
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sentry1.GetValue(${vision_type}, sentry_obj_info_e.kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry1 get [VISION_TYPE] [VISION_ID] [OBJ_INFO]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION"
    //% VISION_ID.shadow="number" VISION_ID.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.VISION_ID.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sentry1.GetValue(${vision_type},${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }


    //% block="Sentry1 get Color [NUM] [OBJ_RGB_INFO]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_RGB_INFO.shadow="dropdown" OBJ_RGB_INFO.options="OBJ_RGB_INFO"    
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_RGB_INFO.code;
        Generator.addCode([`sentry1.GetValue(sentry_vision_e.kVisionColor,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry1 get Line [NUM] [OBJ_LINE_INFO]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_LINE_INFO.shadow="dropdown" OBJ_LINE_INFO.options="OBJ_LINE_INFO"    
    export function GetLineValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_LINE_INFO.code;
        Generator.addCode([`sentry1.GetValue(sentry_vision_e.kVisionLine,${obj},${num})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry1 Color detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry1.GetValue(sentry_vision_e.kVisionColor,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry1 Blob detected [NUM] [COLOR_LABLE]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sentry1.GetValue(sentry_vision_e.kVisionBlob,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="Sentry1 Card detected [NUM] [CARD_LABLE]" blockType="boolean" 
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sentry1.GetValue(sentry_vision_e.kVisionCard,sentry_obj_info_e.kLabel,${num})==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
