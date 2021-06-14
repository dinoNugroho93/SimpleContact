import React, { Component } from 'react';
import { View, ScrollView, FlatList, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Button, PageContainer, Text, TextBox, Modal, PickerList, LoadingComponent, Image, InputText } from "../../../../UI/Component";
import { CustomDatepicker } from '../../../../UI/AddOns';
import { Header } from "../../../../UI/Bar";
import * as COLORS from "../../../../../Utility/Color/color";
import * as ROUTERLIST from "../../../../Navigation/routerList";
import { PagePop, RouterDirector } from "../../../../Navigation/appNavigator";
import { HeaderFormScreen } from "../../../../UI/Bar/Header/headerFormScreen";
import moment from "moment/moment";
import * as SIZE from "../../../../../Utility/Size/size";
import userStore from "../../../../../Store/UserInfo/userStore";
import { indexOf } from "../../../../../Utility/ExportFunc/exportFunc";
import { AlertPage } from "../../../../PopUp/HandlinhSUCCESSFAILED/alertPage";
import LinearGradient from 'react-native-linear-gradient'
import { postAPI } from "../../../../../makeHTTPS/api";
import { DELETEDATA, GETDATA, GETDATAMASTER, SAVEDATA, UPDATESTATUS } from "../../../../../makeHTTPS/serverApi";
import { IcoChevronDown, IcoCopy } from '../../../../../asset/images';
import { DigitSeperator, DigitSeperatorInput, RemoveDigitSeperator } from '../../../../../Utility/ExportFunc/stringUtils';
import formStore from '../../../../../Store/formStore';
import { TextInput } from 'react-native-gesture-handler';
import backButtonStore from '../../../../../Store/Global/backButtonStore';
import { array } from 'prop-types';

const { height, width } = Dimensions.get('window');
export default class InputDataSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpVIsible: false,
            tempArray: [],
            dataInput: [],
            valueText: [],
            radioButtonViseble: false,
            expiredDateErr: "",
            expiredDate: "",
            expiredDateSelectedMillis: "",
            loginHp: [],
            dataTaskInputan: [],
            loginHpErr: false,
            dataReference: [],
            dataField: [],
            pickerList: false,
            pickerValue: "",
            loading: false,
            alert: false,
            exception: "1",
            content: [],
            indexDropDown: 0,
            indexDate: 0,
            borderWidthFocused: false,
            inputError: false,
            inputBorder: [],
            isReferance: false,
            groupReference: [],
            newFormName: "",
            titlePicker: "",
            indexTextArea: 0,
            isCopy: false,
            allowDeleteItem: "",
            allowSave: "",
            allowApproveForm: "",
            allowRejectForm: "",
            searchValue: ""

        }
    }

    toggleValidationRadioButton(pin) {
        this.setState({
            PinContainer: pin,
        })
    }

    toogleAlert(toggle, exceptions) {
        this.setState({
            alert: toggle,
            exception: exceptions
        })
    }

    async componentDidMount() {
        //await this.createContent()
        if (this.props.propsSectionType === "field") {
            await this.getDataField()
        } else {
            await this.checkingContent(formStore.listFormMultiple)
        }
        // let dataLenght = this.state.dataTaskInputan.length;
        // for(let i=0;i<dataLenght;i++){
        //     this.state.loginHp.push({nama:"", value:""});
        // }
    }

    componentWillUnmount() {
        const { params } = this.props.navigation.state
        params.callhome()
    }

    render() {
        return (
            <PageContainer containerStyle={{ flex: 1 }} barStyle={'light-content'} statusBarColor={COLORS.SOFT_BLUE}>
                <LoadingComponent loadingVisible={this.state.loading} />
                <View style={{ flex: 1 }}>
                    <HeaderFormScreen
                        textLabel={this.props.propsTrackName}
                        subtext={this.props.propsSectionName}
                        textSize={12}
                        subTextSize={20} />
                    {/* <View style={{paddingTop:20, width:'100%', height:80, backgroundColor:COLORS.GREENCOMPONET, paddingLeft:15}}>
                        <ScrollView horizontal={true}>
                            {this.renderHeaderList()}
                        </ScrollView>
                    </View> */}
                    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', }} behavior={Platform.OS === "ios" ? "padding" : null} enabled keyboardVerticalOffset={100}>
                        <ScrollView>
                            <View style={{ marginTop: 30, flex: 1, marginHorizontal: 20 }}>
                                {this.renderInputnasabah()}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <View>

                    <LinearGradient colors={[COLORS.ORANGEBUTTON, COLORS.YELLOWBUTTON]} style={{
                        alignItems: 'center',
                        justifyContent: 'center', height: height * 0.088, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 2.65,
                        elevation: 4, width: '100%'
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            {
                                (this.state.allowSave == "1") && (
                                    <>
                                        <Button action={() => {
                                            this.validationInputForm()
                                        }} buttonStyle={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: "#000",
                                            borderColor: COLORS.TEXTBACKGROUND,
                                            borderRightWidth: 1,
                                            borderlefttWidth: 1
                                        }}>
                                            <Text
                                                textStyle={{ letterSpacing: 5 }}
                                                textLabel={'SAVE'}
                                                textFontWeight={'bold'}
                                                textSize={16}
                                                textColor={COLORS.TEXTBACKGROUND} />
                                        </Button>
                                    </>
                                )
                            }
                            {
                                (this.state.allowDeleteItem == "1") && (
                                    <>
                                        <Button action={() => {
                                            this.deleteDATA()
                                        }} buttonStyle={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: "#000",
                                            borderColor: COLORS.TEXTBACKGROUND,
                                            borderRightWidth: 1,
                                            borderlefttWidth: 1
                                        }}>
                                            <Text
                                                textLabel={'DELETE'}
                                                textColor={COLORS.TEXTBACKGROUND}
                                                extFontWeight={'bold'}
                                                textSize={16} />
                                        </Button>
                                    </>
                                )
                            }
                            {
                                (this.state.allowRejectForm == "1") && (
                                    <>
                                        <Button action={() => {
                                            this.submitproses()
                                        }} buttonStyle={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: "#000",
                                            borderColor: COLORS.TEXTBACKGROUND,
                                            borderRightWidth: 1,
                                            borderlefttWidth: 1
                                        }}>
                                            <Text
                                                textLabel={'REJECT'}
                                                textColor={COLORS.TEXTBACKGROUND}
                                                extFontWeight={'bold'}
                                                textSize={16} />
                                        </Button>
                                    </>
                                )
                            }
                            {
                                (this.state.allowApproveForm == "1") && (
                                    <>
                                        <Button action={() => {
                                            this.validationInputForm()
                                        }} buttonStyle={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: "#000",
                                            borderColor: COLORS.TEXTBACKGROUND,
                                            borderRightWidth: 1,
                                            borderlefttWidth: 1
                                        }}>
                                            <Text
                                                textLabel={'APPROVE'}
                                                textColor={COLORS.TEXTBACKGROUND}
                                                extFontWeight={'bold'}
                                                textSize={16} />
                                        </Button>
                                    </>
                                )
                            }
                            {
                                (this.state.allowDeleteItem == "0" && this.state.allowSave == "0" && this.state.allowApproveForm == "0" && this.state.allowRejectForm == "0") && (
                                    <>
                                        <Button action={() => {
                                            PagePop();
                                        }} buttonStyle={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            shadowColor: "#000",
                                            borderColor: COLORS.TEXTBACKGROUND,
                                            borderRightWidth: 1,
                                            borderlefttWidth: 1
                                        }}>
                                            <Text
                                                textLabel={'TUTUP'}
                                                textColor={COLORS.TEXTBACKGROUND}
                                                extFontWeight={'bold'}
                                                textSize={16} />
                                        </Button>
                                    </>
                                )
                            }
                        </View>
                    </LinearGradient>

                </View>
                <AlertPage
                    verificationClose={() => { this.toogleAlert(false) }}
                    verificationVisible={this.state.alert}
                    actionYes={() => { RouterDirector(ROUTERLIST.HOME_INPUT_DATA_SURVEY) }}
                    typeException={this.state.exception} />
                {this.popupPicker()}
            </PageContainer>
        )
    }

    renderHeaderList() {
        return (
            <View>
                <FlatList
                    horizontal={true}
                    extraData={this.state}
                    data={this.state.dataHeaderList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <Button buttonStyle={{ marginRight: 10, borderWidth: 1.5, borderRadius: 20, height: 40, width: 160, borderColor: COLORS.TEXTBACKGROUND }}
                            action={() => {
                                /* if(indexOf(this.state.tempArray,s=>s===item.product) !== -1){
                                     let tampung = this.state.tempArray;
                                     let tmp = item.product;
                                     let index = indexOf(tampung,s=>s===tmp);
                                     tampung.splice(index, 1);
                                     this.setState({tempArray:tampung});
      
                                 }else{
                                     let temp = this.state.tempArray;
                                     temp.push(item.product);
                                     this.setState({tempArray:temp});
      
                                 }*/
                            }}>
                            <View style={{ flex: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Text
                                    textLabel={item.product}
                                    textSize={16}
                                    textFontWeight={'bold'}
                                    textColor={COLORS.TEXTBACKGROUND} />
                            </View>
                        </Button>
                    }
                />
            </View>
        )

    }

    renderInputnasabah() {
        let dateNow = new Date().getTime();
        let arr = this.state.dataField;
        return (
            <View>
                {
                    this.state.dataTaskInputan.map((data, index) => {
                        if (data.fieldType === "Label" || data.fieldType === "label") {
                            return (
                                <View>
                                    {
                                        (data.value.fieldFlagHide === "0") && (
                                            <View style={{ marginBottom: 10 }}>
                                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <Text
                                                        textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                                        textColor={COLORS.BLACK}
                                                        textFontWeight={'bold'}
                                                        textSize={SIZE.fnt_3}
                                                        textStyle={{ marginBottom: 8 }}
                                                    />
                                                    {this.state.loginHp[index].fieldError ?
                                                        <Text
                                                            textLabel={'Wajib Diisi'}
                                                            textSize={12}
                                                            textColor={COLORS.REDGLOBAL}
                                                            textStyle={{ marginBottom: 8 }} /> : null}
                                                </View>
                                                <View style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 10,
                                                    flexDirection: "row",
                                                    flex: 1,
                                                    borderColor: ((this.state.inputError) ? COLORS.REDGLOBAL : this.state.inputBorder),
                                                    borderWidth: 0.7,
                                                    borderRadius: 10
                                                }}>
                                                    <Text textStyle={{ alignSelf: 'center' }} textSize={SIZE.fnt_5}
                                                        textColor={data.value.fieldFlagEnable == "1" ? COLORS.BLACK : COLORS.GREY} textLabel={data.fieldDataType === "Float" ? DigitSeperator(this.state.loginHp[index].fieldValue) : this.state.loginHp[index].fieldValue} />
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        } else if (data.fieldType === "Textbox" || data.fieldType === "textbox") {
                            return (
                                <View>
                                    {
                                        (data.value.fieldFlagHide === "0") && (
                                            <View
                                                style={{}}>
                                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <Text
                                                        textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                                        textFontWeight={'bold'}
                                                        textColor={COLORS.BLACK}
                                                        textSize={SIZE.fnt_3}
                                                        textStyle={{ marginBottom: 8 }} />
                                                    {this.state.loginHp[index].fieldError ?
                                                        <Text
                                                            textLabel={'Wajib Diisi'}
                                                            textSize={12}
                                                            textColor={COLORS.REDGLOBAL}
                                                            textStyle={{ marginBottom: 8 }} /> : null}
                                                </View>
                                                <View style={{ justifyContent: 'center', paddingVertical: 5, paddingHorizontal: 10, flex: 1, borderColor: ((this.state.loginHp[index].fieldError) ? COLORS.REDGLOBAL : this.state.loginHp[index].inputBorder), borderWidth: 0.7, borderRadius: 10 }}>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        paddingTop: 5
                                                    }}>
                                                        <InputText
                                                            inputLength={parseInt(data.fieldDataLength)}
                                                            inputColor={data.value.fieldFlagEnabled == "1" ? COLORS.BLACK : COLORS.GREY}
                                                            inputValue={data.fieldRule === "decimal" ? DigitSeperatorInput(this.state.loginHp[index].fieldValue) : this.state.loginHp[index].fieldValue}
                                                            inputFocus={() => { this.borderOnFocus(this.state.loginHp[index].fieldError, index) }}
                                                            inputBlur={() => {
                                                                let dataReference = data.referenceParameter.length
                                                                this.borderOnBlur(this.state.loginHp[index].fieldError, dataReference, data.fieldId, index, data.fieldType)
                                                            }}
                                                            inputType={data.fieldRule === "numericonly" || data.fieldRule === "decimal" ? "numeric" : "default"}
                                                            action={(textValue) => {
                                                                if (data.value.fieldFlagEnable = "1") {
                                                                    var { loginHp } = this.state;
                                                                    loginHp[index].fieldValue = textValue
                                                                    this.setState({ loginHp })
                                                                    this.state.content[index].fieldName = data.value.fieldName
                                                                    this.state.content[index].fieldValue = RemoveDigitSeperator(textValue)
                                                                }

                                                            }}
                                                            inputHidden={false}
                                                            inputEditable={data.readOnly === "0" ? true : false}
                                                        />
                                                    </View>
                                                </View>
                                                <View
                                                    containerStyle={{ alignItems: "flex-end" }}>
                                                    <Text
                                                        textLabel={this.state.inputError}
                                                        textColor={((this.state.inputError) ? COLORS.REDGLOBAL : COLORS.BLACK)}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        } else if (data.fieldType === "dropdown") {
                            return (
                                <View>
                                    {
                                        (data.value.fieldFlagHide == "0") && (
                                            <View style={{ marginBottom: 10 }}>
                                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <Text
                                                        textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                                        textColor={COLORS.BLACK}
                                                        textFontWeight={'bold'}
                                                        textSize={SIZE.fnt_3}
                                                        textStyle={{ marginBottom: 8 }}
                                                    />
                                                    {this.state.loginHp[index].fieldError ?
                                                        <Text
                                                            textLabel={'Wajib Diisi'}
                                                            textSize={12}
                                                            textColor={COLORS.REDGLOBAL}
                                                            textStyle={{ marginBottom: 8 }} /> : null}
                                                </View>
                                                <View style={{
                                                    justifyContent: 'center',
                                                    //alignItems:'center',
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 10,
                                                    flexDirection: "row",
                                                    flex: 1,
                                                    borderColor: ((this.state.loginHp[index].fieldError) ? COLORS.REDGLOBAL : this.state.loginHp[index].inputBorder),
                                                    borderWidth: 0.7,
                                                    borderRadius: 10
                                                }}>
                                                    <Button buttonStyle={{ flex: 0.9 }}
                                                        action={() => {
                                                            if (data.value.fieldFlagEnabled == "1") {
                                                                let dataReference = data.referenceParameter.length
                                                                this.checkReferenceParam(dataReference, data.fieldId, index, data.fieldType)
                                                                //this.spinerData(data.fieldId, index)
                                                                this.state.content[index].fieldName = data.value.fieldName
                                                                this.setState({
                                                                    indexDropDown: index,
                                                                    titlePicker: data.fieldLabel
                                                                })
                                                            }
                                                        }}>
                                                        <Text textStyle={{ alignSelf: 'center' }} textSize={SIZE.fnt_5}
                                                            textColor={data.value.fieldFlagEnabled == "1" ? COLORS.BLACK : COLORS.GREY} textLabel={this.state.loginHp[index].fieldValue} />
                                                    </Button>
                                                    <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                                        <Image imageSource={IcoChevronDown}
                                                            imageStyle={{ alignSelf: 'center', height: 15, width: 15 }}
                                                            imageResizeMode={'cover'} />
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>

                            )
                        } else if (data.fieldType === "date") {
                            return (
                                <View>
                                    {
                                        (data.value.fieldFlagHide == "0") && (
                                            <View style={{ marginBottom: 10 }}>
                                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <Text
                                                        textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                                        textColor={COLORS.BLACK}
                                                        textFontWeight={'bold'}
                                                        textSize={SIZE.fnt_3}
                                                        textStyle={{ marginBottom: 8 }}
                                                    />
                                                    {this.state.loginHp[index].fieldError ?
                                                        <Text
                                                            textLabel={'Wajib Diisi'}
                                                            textSize={12}
                                                            textColor={COLORS.REDGLOBAL}
                                                            textStyle={{ marginBottom: 8 }} /> : null}
                                                </View>
                                                <View style={{
                                                    justifyContent: 'center',
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 10,
                                                    flex: 1,
                                                    borderColor: ((this.state.inputError) ? COLORS.REDGLOBAL : this.state.inputBorder),
                                                    borderWidth: 0.7,
                                                    borderRadius: 10
                                                }}>
                                                    <Button buttonStyle={{ flex: 1 }}
                                                        action={() => {
                                                            if (data.value.fieldFlagEnabled == "1") {
                                                                this.expirion.toggleDatePicker(true)
                                                                this.state.content[index].fieldName = data.value.fieldName
                                                                this.setState({ indexDate: index })
                                                            }

                                                        }}>
                                                        <Text textStyle={{ alignSelf: 'center' }} textSize={SIZE.fnt_5}
                                                            textColor={data.value.fieldFlagEnabled == "1" ? COLORS.BLACK : COLORS.GREY} textLabel={this.state.loginHp[index].fieldValue} />
                                                    </Button>
                                                    <CustomDatepicker
                                                        ref={(datePicker) => {
                                                            this.expirion = datePicker;
                                                        }}
                                                        action={(value) => {
                                                            if (data.value.fieldFlagEnabled == "1") {
                                                                var { loginHp } = this.state;
                                                                loginHp[this.state.indexDate].fieldValue = moment(value).format("DD-MM-YYYY")
                                                                this.setState({ loginHp })
                                                                //this.state.content[this.state.indexDate].fieldName = data.value.fieldName
                                                                this.state.content[this.state.indexDate].fieldValue = moment(value).format("DD-MM-YYYY")
                                                                let dataReference = data.referenceParameter.length
                                                                this.checkReferenceParam(dataReference, data.fieldId, index, data.fieldType)
                                                            }
                                                        }} />
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        } else if (data.fieldType === "textarea") {
                            return (
                                <View>
                                    {
                                        (data.value.fieldFlagHide == "0") && (
                                            <View style={{ marginBottom: 10, }}>
                                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <Text
                                                        textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                                        textColor={COLORS.BLACK}
                                                        textFontWeight={'bold'}
                                                        textSize={SIZE.fnt_3}
                                                        textStyle={{ marginBottom: 8 }}
                                                    />
                                                    {(this.state.loginHp[index].fieldError && data.fieldType === "textarea") && (
                                                        <Text
                                                            textLabel={'Wajib Diisi'}
                                                            textSize={12}
                                                            textColor={COLORS.REDGLOBAL}
                                                            textStyle={{ marginBottom: 8 }} />)}
                                                </View>
                                                <View style={{
                                                    borderColor: ((this.state.loginHp[index].fieldError) ? COLORS.REDGLOBAL : this.state.loginHp[index].inputBorder),
                                                    borderWidth: 0.7,
                                                    padding: 5
                                                }}>
                                                    <TextInput
                                                        value={data.fieldRule === "decimal" ? DigitSeperator(this.state.loginHp[index].fieldValue) : this.state.loginHp[index].fieldValue}
                                                        keyboardType="default"
                                                        returnKeyType="done"
                                                        style={{ height: 150, justifyContent: "flex-start", fontSize: SIZE.fnt_5 }}
                                                        underlineColorAndroid="transparent"
                                                        placeholder="Type something"
                                                        placeholderTextColor="grey"
                                                        numberOfLines={10}
                                                        multiline={true}

                                                        blurOnSubmit={true}
                                                        editable={data.readOnly === "0" ? true : false}
                                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                                        onChangeText={(textValue) => {
                                                            if (data.value.fieldFlagEnabled == "1") {
                                                                // seasonCheck();
                                                                // let onlyNumber = value;
                                                                // if (inputType === "numeric") {
                                                                //     onlyNumber = value.replace(/\D/g, '');
                                                                // }else if(inputType === "text") {
                                                                //     onlyNumber = value.replace( /[^a-zA-Z\s]/g, "");
                                                                // }
                                                                // if (action !== null) {
                                                                //     action(onlyNumber);
                                                                // }
                                                                var { loginHp } = this.state;
                                                                loginHp[index].fieldValue = textValue
                                                                this.setState({ loginHp })
                                                                this.state.content[index].fieldName = data.value.fieldName
                                                                this.state.content[index].fieldValue = textValue
                                                            }
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        } else if (data.fieldType === "textarea-copy") {
                            return (
                                <View>
                                    {
                                        (data.value.fieldFlagHide == "0") && (<View style={{ marginBottom: 10, }}>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                <Text
                                                    textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                                    textColor={COLORS.BLACK}
                                                    textFontWeight={'bold'}
                                                    textSize={SIZE.fnt_3}
                                                    textStyle={{ marginBottom: 8 }}
                                                />
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                                    <Button buttonStyle={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}
                                                        action={() => {
                                                            this.copyData()
                                                        }}>
                                                        <Text
                                                            textLabel={"Copy"}
                                                            textColor={COLORS.BLACK}
                                                            textSize={SIZE.fnt_4}
                                                            textStyle={{ marginRight: 5 }}
                                                            textFontWeight={"bold"} />
                                                        <Image
                                                            imageSource={IcoCopy}
                                                            imageStyle={{ width: 20, height: 20 }}
                                                            imageResizeMode={'cover'}
                                                        />
                                                    </Button>
                                                </View>
                                            </View>
                                            <View style={{
                                                borderColor: ((this.state.loginHp[index].fieldError) ? COLORS.REDGLOBAL : this.state.loginHp[index].inputBorder),
                                                borderWidth: 0.7,
                                                padding: 5
                                            }}>
                                                <TextInput
                                                    value={data.fieldRule === "decimal" ? DigitSeperator(this.state.loginHp[index].fieldValue) : this.state.loginHp[index].fieldValue}
                                                    keyboardType="default"
                                                    returnKeyType="done"
                                                    style={{ height: 150, justifyContent: "flex-start", fontSize: SIZE.fnt_5 }}
                                                    underlineColorAndroid="transparent"
                                                    placeholder="Type something"
                                                    placeholderTextColor="grey"
                                                    numberOfLines={10}
                                                    multiline={true}
                                                    blurOnSubmit={true}
                                                    editable={data.readOnly === "0" ? true : false}
                                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                                    onChangeText={(textValue) => {
                                                        if (data.value.fieldFlagEnabled == "1") {
                                                            // seasonCheck();
                                                            // let onlyNumber = value;
                                                            // if (inputType === "numeric") {
                                                            //     onlyNumber = value.replace(/\D/g, '');
                                                            // }else if(inputType === "text") {
                                                            //     onlyNumber = value.replace( /[^a-zA-Z\s]/g, "");
                                                            // }
                                                            // if (action !== null) {
                                                            //     action(onlyNumber);
                                                            // }
                                                            var { loginHp } = this.state;
                                                            loginHp[index].fieldValue = textValue
                                                            this.setState({ loginHp })
                                                            this.state.content[index].fieldName = data.value.fieldName
                                                            this.state.content[index].fieldValue = textValue
                                                        }

                                                    }}
                                                />
                                            </View>
                                        </View>)
                                    }
                                </View>
                            )
                        } else if (data.type === "popUpPicker") {
                            return (
                                <View style={{ height: 66, marginBottom: 10 }}>
                                    <Text
                                        textLabel={data.fieldMandatory === "1" ? `${data.fieldLabel} *` : data.fieldLabel}
                                        textColor={COLORS.BLACK}
                                        textFontWeight={'bold'}
                                        textSize={SIZE.fnt_3}
                                        textStyle={{ marginBottom: 8 }}
                                    />
                                    <View style={{
                                        justifyContent: 'center',
                                        paddingHorizontal: 10,
                                        flex: 1,
                                        borderColor: ((this.state.inputError) ? COLORS.REDGLOBAL : this.state.inputBorder),
                                        borderWidth: 0.7,
                                        borderRadius: 10
                                    }}>
                                        <Button buttonStyle={{ flex: 1, alignItems: 'center' }}
                                            action={() => {
                                                if (data.fieldFlagEnable == "1") {
                                                    this.tooglePopUpGender(true);
                                                }
                                            }}>
                                            <Text textStyle={{ alignSelf: 'center' }} textSize={SIZE.fnt_5}
                                                textColor={COLORS.BLACK} textLabel={this.state.valueGender} />
                                        </Button>
                                    </View>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }


    /** API ======================================================================================= */

    submitproses() {
        request = {
            "regno": this.props.propsregno,
            "userid": userStore.userid,
            "tc": this.props.propsTC,
            "status": this.props.propsSectionName,
            "reason": "",
            "desc": ""
        }
        console.log(JSON.stringify(request))
        postAPI(request, UPDATESTATUS)
            .then((callback) => {
                if (callback.status === "1") {
                    alert(callback.message)
                    RouterDirector(ROUTERLIST.HOME_INPUT_DATA_SURVEY)
                } else {
                    alert(callback.message)
                }
            })

    }

    getMasterForm() {
        this.setState({ loading: true })
        let request = {
            "type": "form",
            "regno": this.props.propsregno,
            "userid": userStore.userid,
            "tc": this.props.propsTC,
        };
        postAPI(request, GETDATAMASTER)
            .then((callback) => {
                if (callback.status === "1") {
                    this.setState({ loading: false })
                    userStore.dataMasterForm = callback.data
                    this.getDataField()
                    console.log("[Response]", JSON.stringify(userStore.dataMasterForm))
                } else {
                    this.setState({ loading: false })
                    alert(callback.message);
                }
            })
    }

    getDataNewCaseCanding(content, isReference, data, index, fieldType) {
        this.setState({ loading: true });
        console.log("newCascanding:" + index)
        request = {
            "dataLevel": this.props.propsSectionType,
            "flag": this.state.copyData ? "copyvalue" : "",
            "formname": this.props.propsFormCode,
            "regno": this.props.propsregno,
            "sectionId": this.state.newFormName === "" ? this.props.propsFormName : this.state.newFormName,
            "tableName": this.props.propsTableName,
            "tc": this.props.propsTC,
            "type": "newcascading",
            "userid": userStore.userid,
            "content": content
        }
        console.log("requestCascanding" + request)
        postAPI(request, GETDATAMASTER)
            .then((callback) => {
                if (callback.status === "1") {
                    this.setState({ loading: false, copyData: false });
                    let fieldCascanding = []
                    if (callback.data.length == 0) {
                        formStore.needChangeForm = data.needChangeForm
                        fieldCascanding = content
                        this.setState({ newFormName: this.props.propsFormName })
                    } else {
                        callback.data.map((data) => {
                            fieldCascanding = data.field
                            this.setState({ newFormName: data.sectionId })
                        })
                    }
                    if (callback.needChangeForm === "1") {
                        this.onClearArray()
                        this.getMasterForm()
                    } else {
                        this.getSyncFormMaster(fieldCascanding, isReference, data, index, fieldType)
                    }
                } else {
                    this.setState({ loading: false, copyData: false })
                    alert(callback.message)
                }
            })
    }

    deleteDATA() {
        this.setState({ loading: true });
        request = {
            "regno": this.props.propsregno,
            "userid": userStore.userid,
            "tc": this.props.propsTC,
            "formName": this.props.propsFormName,
            "tableName": this.props.propsTableName,
            "field": this.state.content
        }
        console.log("isi ContentDELETE:" + JSON.stringify(request))
        postAPI(request, DELETEDATA)
            .then((callback) => {
                if (callback.status === "1") {
                    this.setState({ loading: false });
                    Alert.alert(
                        "Perhatian",
                        callback.message,
                        [
                            { text: "OK", onPress: () => RouterDirector(ROUTERLIST.HOME_INPUT_DATA_SURVEY) }
                        ],
                        { cancelable: false }
                    );
                } else {
                    this.setState({ loading: false });
                    alert(callback.message)
                }
            })
    }

    saveData() {
        this.setState({ loading: true });
        let payload = {
            "dataLevel": "section",
            "regno": this.props.propsregno,
            "tc": this.props.propsTC,
            "userid": userStore.userid,
            "type": this.props.propsFormCode
        }
        let requestData = {
            "regno": this.props.propsregno,
            "userid": userStore.userid,
            "tc": this.props.propsTC,
            "formName": this.props.propsFormName,
            "tableName": this.props.propsTableName,
            "field": this.state.content
        }
        console.log("isi save data:" + JSON.stringify(requestData))
        postAPI(requestData, SAVEDATA)
            .then((callback) => {
                if (callback === "1") {
                    this.setState({ loading: false })
                    this.toogleAlert(true, "0")
                    RouterDirector(ROUTERLIST.HOME_INPUT_DATA_SURVEY, { propsPayload: payload, update: true });
                } else {
                    this.setState({ loading: false })
                    this.toogleAlert(true, "1")
                }
            })
    }

    getSection() {
        this.setState({ loading: true })
        let request = {
            "dataLevel": "section",
            "regno": this.props.propsregno,
            "tc": this.props.propsTC,
            "userid": userStore.userid,
            "type": this.props.propsFormCode
        }
        console.log(request)
        postAPI(request, GETDATA)
            .then((callback) => {
                if (callback.status === "1") {
                    //this.setState({loading: false})
                    formStore.sectionData = callback.data
                    //RouterDirector(ROUTERLIST.HOME_INPUT_DATA_SURVEY, { propsCusID: cusId, propsCusName: customername, propsregno: ap_regno, propsTC: track_id, propsFormCode: formCode, propsTrackName: track_name });
                } else {
                    //this.setState({loading: false})
                    alert(callback.message);
                }
            })
    }

    getDataField() {
        this.setState({ loading: true });
        let request = {
            "regno": this.props.propsregno,
            "userid": userStore.userid,
            "tc": this.props.propsTC,
            "type": this.props.propsFormCode,
            "formname": this.state.newFormName === "" ? this.props.propsFormName : this.state.newFormName,
            "dataLevel": this.props.propsSectionType,
        };
        postAPI(request, GETDATA)
            .then((callback) => {
                if (callback !== undefined) {
                    if (callback.status === "1") {
                        //this.setState({ loading: false });
                        //LoadingComponent.toggleLoading(false)
                        let tampung = []
                        callback.data.map((data, index) => {
                            tampung = data.field
                            this.setState({
                                dataField: data.field,
                                allowDeleteItem: callback.allowDeleteItem,
                                allowSave: callback.allowSave,
                                allowApproveForm: callback.allowApproveForm,
                                allowRejectForm: callback.allowRejectForm
                            });
                        })
                        if (tampung.length !== 0) {
                            this.checkingContent(tampung)
                        } else {
                            this.createContent()
                        }
                        //this.getSyncFormMaster()
                    } else {
                        this.setState({ loading: false });
                        alert(callback.menuSurvey)
                    }
                } else {
                    this.setState({ loading: false });
                    alert('No connection ')
                }
            })
    }
    getDataMasterReference() {
        let request = {
            "type": "reference"
        };
        postAPI(request, GETDATAMASTER)
            .then((callback) => {
                if (callback.status === "1") {
                    this.setState({ loading: false });
                    callback.data.map((data, index) => {
                        this.setState({ dataReference: data.content }, () => {
                            //alert(JSON.stringify(this.state.dataReference))

                        })
                    })

                } else {
                    this.setState({ loading: false });
                    alert(callback.message);
                }
            })
    }

    /** METHOD ======================================================================================= */

    async copyData() {
        this.setState({ copyData: true }, () => {
            this.getDataNewCaseCanding(this.state.content)
        })
    }

    onClearArray = () => {
        this.setState({
            content: [],
            groupReference: []
        });
    };

    borderOnFocus(fieldError, index) {
        if (!fieldError) {
            this.setState({ borderWidthFocused: true });
            this.state.loginHp[index].inputBorder = COLORS.GREENCOMPONET
        }
        else {
            this.state.loginHp[index].inputBorder = COLORS.REDGLOBAL
        }
    }

    borderOnBlur(fieldError, reference, data, index, fieldType) {
        if (!fieldError) {
            this.setState({
                borderWidthFocused: false
            });
            this.state.loginHp[index].inputBorder = COLORS.BLACK
            this.checkReferenceParam(reference, data, index, fieldType)
        }
        else {
        }
    }



    checkReferenceParam(reference, data, index, fieldType) {
        let dataReference = this.state.groupReference
        let val = dataReference.find((e) => {
            return e.parameterId === data
        })
        if (val !== undefined) {
            this.setState({ isReferance: true })
            if (fieldType === 'textbox' || fieldType === 'date') {
                let isReference = false
                this.getDataNewCaseCanding(this.state.content, isReference, data, index, fieldType)
            } else if (fieldType === 'dropdown') {
                this.spinerData(data, index)
            }
        } else {
            this.setState({ isReferance: false })
            if (fieldType === "dropdown") {
                this.spinerData(data, index)
            }



            // if(parameterId.parameterId === data && valueParameterID !== undefined){
            //     console.log("[parameter ID] TRUE")
            // }else{
            //     console.log("[parameter ID] FALSE")
            // }



            // console.log("reference:" + index)
            // this.setState({ indexDropDown: index })
            // if (reference !== 0) {
            //     this.setState({ isReferance: true })
            //     let isReference = true
            //     this.getDataNewCaseCanding(this.state.content, isReference, data, index, fieldType)
            // } else {
            //     if(fieldType === "dropdown"){
            //         this.setState({ isReferance: false })
            //         let isReference = false
            //         this.spinerData(data, index, isReference,)
            //     }else{
            //         this.setState({ isReferance: false })
            //     }
            // }
        }
    }

    checkingContent(arr) {
        let tempContent = this.state.content
        arr.map((data, index) => {
            tempContent.push({ "fieldName": data.fieldName, "fieldValue": data.fieldValue === "" ? "null" : data.fieldValue })
        })
        console.log("isi Content:" + JSON.stringify(tempContent))
        this.getDataNewCaseCanding(tempContent);
        this.setState({ content: tempContent })

    }
    checkReference() {
        let comparaeData = this.state.dataTaskInputan
        if (comparaeData.ref) {
        }
    }

    spinerData(data, index) {
        console.log("siner:" + index)
        let temData = data
        let comparaeData = this.state.dataTaskInputan
        let fieldValueLists = comparaeData.find(e => e.fieldId === temData)
        let listValue = fieldValueLists.value.fieldValueList
        this.setState({ dataReference: listValue, pickerList: true }, () => {
            this.pickerText.focus();
        })
    }

    createContent() {
        let tempContent = this.state.content
        let formMaster = userStore.dataMasterForm.find(e => e.sectionId === this.props.propsFormName)
        let tempForm = formMaster.field
        for (let i = 0; i < tempForm.length; i++) {
            tempContent.push({ "fieldName": "null", "fieldValue": "null" });
        }
        console.log("isi content" + JSON.stringify(tempContent))
        this.getDataNewCaseCanding(tempContent);
        this.setState({ content: tempContent })
    }

    getSyncFormMaster(dataCascanding, isReference, data, indexDropdwon, fieldType) {
        let tempContent = this.state.content
        let formMaster = new Array()
        try {
            formMaster = userStore.dataMasterForm.find(e => e.sectionId === this.state.newFormName)
        } catch (e) {
            console.log("Form Doesn't Exist", e)
        }
        let tempForm = formMaster.field
        let dataField = dataCascanding
        if (dataField.length !== 0) {
            dataField.map((data, index) => {
                if (!isReference) {
                    tempContent[index] = { fieldName: data.fieldName, fieldValue: data.fieldValue }
                }
                //tempForm[index].value = data
                if (data.fieldId === tempForm[index].fieldId) {
                    tempForm[index].value = data
                }
            })
            console.log("gabunganYES" + JSON.stringify(tempForm))
            console.log("content" + JSON.stringify(tempContent))
            this.createDataReferencaParameter(tempForm)
            this.inputTextBox(tempForm, isReference, data, indexDropdwon, fieldType)
            this.setState({ dataTaskInputan: tempForm })
            // if (!isReference) {
            //     this.setState({ content: tempContent })
            // }
        } else {
            console.log("gabunganNO" + JSON.stringify(tempForm))
            console.log("content" + JSON.stringify(tempContent))
            this.createDataReferencaParameter(tempForm)
            this.inputTextBox(tempForm, isReference, data, indexDropdwon)
            this.setState({ dataTaskInputan: tempForm })
        }
    }
    inputTextBox(tempForm, isReference, data, indexDropDown, fieldType) {
        let dataArr = tempForm
        let tempTextBoc = []
        let tempContent = this.state.content
        console.log("[dataForm]", JSON.stringify(dataArr))
        dataArr.map((data, index) => {
            tempTextBoc[index] = { id: index, fieldValue: data.value.fieldValue, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
            tempContent[index] = { fieldName: data.fieldName, fieldValue: data.value.fieldValue }
            if (data.fieldType === "Label" || data.fieldType === "label") {
                tempTextBoc[index] = { id: index, fieldValue: data.value.fieldValue, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
            } else if (data.fieldType === "textarea" || data.fieldType === "textarea-copy") {
                tempTextBoc[index] = { id: index, fieldValue: data.value.fieldValue, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
            } else if (data.fieldType === "Textbox" || data.fieldType === "textbox") {
                tempTextBoc[index] = { id: index, fieldValue: data.value.fieldValue, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
            } else if (data.fieldType === "dropdown") {
                data.value.fieldValueList.map((item, ind) => {
                    if (item.selected === "true") {
                        tempTextBoc[index] = { id: index, fieldValue: item.dataDesc, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
                        tempContent[index].fieldValue = item.dataId
                    } else {
                        if (ind === 0) {
                            tempTextBoc[index] = { id: index, fieldValue: item.dataDesc, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
                            tempContent[index].fieldValue = item.dataId

                        }
                    }
                })
            } else if (data.fieldType === "date") {
                tempTextBoc[index] = { id: index, fieldValue: data.value.fieldValue, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
            } else {
                tempTextBoc[index] = { id: index, fieldValue: data.value.fieldValue, fieldError: false, inputBorder: COLORS.BLACK, isMandatory: data.fieldMandatory }
            }
        })
        console.log("content" + JSON.stringify(tempContent))
        console.log("isi textBox:" + JSON.stringify(tempTextBoc))
        this.setState({ loginHp: tempTextBoc, content: tempContent })
        if (isReference && fieldType === "dropdown") {
            this.spinerData(data, indexDropDown)
            //this.setState({pickerList:true})
        }
    }

    newScandingFuction(fieldId) {
        let tempId = fieldId

    }


    getDataDropDown(str) {
        let filterByObject = this.state.dataReference;
        if (str !== "") {
            let value = filterByObject.filter(item => item.dataId === str);
            return value.map(values => values.dataDesc)
        } else {
        }
    }

    popupPicker() {
        let index = this.state.indexDropDown
        let titlePicker = this.state.titlePicker
        return (
            <PickerList
                backgroundTitle={COLORS.GREENCOMPONET}
                data={this.state.dataReference}
                titlePicker={titlePicker}
                showPicker={this.state.pickerList}
                dismissPicker={() => {
                    this.setState({
                        pickerList: false
                    })
                }}
                textReference={(temp) => {
                    this.pickerText = temp;
                }}
                actionSearchDelete={() => {
                    this.setState({
                        searchValue: ""
                    });
                }}
                actionSearch={(value) => {
                    this.setState({
                        searchValue: value
                    })
                }}
                textSearchValue={this.state.searchValue}
                action={(value, label) => {
                    this.state.loginHp[index].fieldValue = value
                    this.state.content[index].fieldValue = label
                    console.log("[click picker]", this.state.loginHp[index].fieldValue)
                    if (this.state.isReferance) {
                        this.getDataNewCaseCanding(this.state.content)
                    }
                    this.setState({
                        pickerList: false,
                    })

                }}
            />
        )
    }

    createDataReferencaParameter(data) {
        let dataForm = data
        dataForm.map((data, index) => {
            if (data.referenceParameter.length !== 0) {
                data.referenceParameter.map((data) => {
                    this.state.groupReference.push(data)
                })
            }
        })

        console.log(JSON.stringify(this.state.groupReference))
    }

    validationInputForm() {
        let objectValidation = this.state.loginHp
        let tempError = []
        objectValidation.map((data, index) => {
            if (data.fieldValue === "" && data.isMandatory === "1") {
                objectValidation[index].fieldError = true
                objectValidation[index].inputBorder = COLORS.REDGLOBAL
                tempError[index] = 'true'
            } else if (data.fieldValue === " -- pilih -- " && data.isMandatory === "1") {
                objectValidation[index].fieldError = true
                objectValidation[index].inputBorder = COLORS.REDGLOBAL
                tempError[index] = 'true'
            } else {
                objectValidation[index].fieldError = false
                objectValidation[index].inputBorder = COLORS.BLACK
                tempError[index] = 'false'
            }
        })
        this.setState({ loginHp: objectValidation })
        let err = tempError.includes('true')
        if (!err) {
            this.saveData()
        }

    }
}