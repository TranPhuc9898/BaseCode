"use strict";
exports.__esModule = true;
var atoms_1 = require("@/atoms");
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
//
var header_1 = require("../components/header/header");
var react_redux_1 = require("react-redux");
var color_1 = require("@/themes/color");
var react_native_eva_icons_1 = require("react-native-eva-icons");
var helpers_1 = require("@/helpers");
var data_1 = require("@/utils/data");
var moment_1 = require("moment");
var DetailScreen = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var infoSlice = react_redux_1.useSelector(function (state) { return state.infoSlice; });
    var mutiSlice = react_redux_1.useSelector(function (state) { return state.mutiSlice; });
    var choiceSlice = react_redux_1.useSelector(function (state) { return state.choiceSlice; });
    var timeSlice = react_redux_1.useSelector(function (state) { return state.timeSlice; });
    var momentSlice = react_redux_1.useSelector(function (state) { return state.momentSlice; });
    var current = moment_1["default"].unix((_a = momentSlice.timeData) !== null && _a !== void 0 ? _a : 0);
    return (React.createElement(react_native_1.View, { style: { flex: 1 } },
        React.createElement(header_1["default"], { nameHeader: "Danh s\u00E1ch c\u00F4ng vi\u1EC7c" }),
        React.createElement(react_native_1.View, { style: styles.body }, infoSlice.InfoList.money === undefined ||
            infoSlice === null ||
            infoSlice === undefined ? (React.createElement(react_native_1.View, { style: { marginTop: 10 } },
            React.createElement(atoms_1.Text, { style: styles.text }, "B\u1EA1n hi\u1EC7n t\u1EA1i ch\u01B0a c\u00F3 c\u00F4ng vi\u1EC7c n\u00E0o!"))) : (React.createElement(react_native_1.Pressable, { onPress: function () {
                react_native_1.Alert.alert('hello');
            }, style: function (_a) {
                var pressed = _a.pressed;
                return [
                    { backgroundColor: '#fff', opacity: pressed ? 0.2 : 1 }
                ];
            } },
            React.createElement(react_native_1.View, { style: styles.viewBox },
                React.createElement(react_native_1.View, { style: [
                        styles.firstViewBox,
                        {
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15
                        }
                    ] },
                    React.createElement(react_native_1.View, { style: styles.itemFirstViewBox },
                        React.createElement(react_native_1.View, null,
                            React.createElement(atoms_1.Text, { style: styles.text }, "D\u1ECDn d\u1EB9p nh\u00E0")),
                        React.createElement(react_native_1.View, { style: {} },
                            React.createElement(react_native_1.View, { style: { paddingTop: 5 } },
                                React.createElement(atoms_1.Text, { style: [styles.subText, {}] }, "\u0110\u00E3 \u0111\u0103ng v\u00E0i gi\u00E2y t\u1EDBi")))),
                    React.createElement(react_native_1.View, { style: styles.button },
                        React.createElement(atoms_1.Text, { style: [
                                styles.subText,
                                { color: color_1.bTaskee, textAlign: 'center' }
                            ] }, "M\u1EDBi \u0111\u0103ng"))),
                React.createElement(react_native_1.View, { style: styles.lineBox }),
                React.createElement(react_native_1.View, { style: styles.flexItem },
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                        React.createElement(react_native_1.View, { style: styles.center },
                            React.createElement(react_native_eva_icons_1.Icon, { name: 'clipboard-outline', fill: color_1.bTaskee, width: 22, height: 22 })),
                        React.createElement(react_native_1.View, null,
                            React.createElement(atoms_1.Text, { style: styles.contentText },
                                helpers_1.formatLetter((_b = timeSlice === null || timeSlice === void 0 ? void 0 : timeSlice.TimeList) === null || _b === void 0 ? void 0 : _b.date),
                                ",", (_c = timeSlice === null || timeSlice === void 0 ? void 0 : timeSlice.TimeList) === null || _c === void 0 ? void 0 :
                                _c.day))),
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginTop: 10 } },
                        React.createElement(react_native_1.View, null,
                            React.createElement(react_native_eva_icons_1.Icon, { name: 'clock-outline', fill: color_1.bTaskee, width: 22, height: 22 })),
                        React.createElement(react_native_1.View, null,
                            React.createElement(atoms_1.Text, { style: styles.contentText }, ((_d = data_1.LIST_DATA3 === null || data_1.LIST_DATA3 === void 0 ? void 0 : data_1.LIST_DATA3[mutiSlice.index]) === null || _d === void 0 ? void 0 : _d.id) !== -1 ? (React.createElement(atoms_1.Text, { style: styles.contentText }, (_e = data_1.LIST_DATA3 === null || data_1.LIST_DATA3 === void 0 ? void 0 : data_1.LIST_DATA3[mutiSlice === null || mutiSlice === void 0 ? void 0 : mutiSlice.index]) === null || _e === void 0 ? void 0 :
                                _e.time,
                                " gi\u1EDD,",
                                React.createElement(atoms_1.Text, null, "B\u1EAFt \u0111\u1EA7u t\u1EEB"),
                                React.createElement(atoms_1.Text, { style: styles.contentText }, (_f = current.hour) === null || _f === void 0 ? void 0 :
                                    _f.call(current).toString().padStart(2, '0'),
                                    " :",
                                    ' '),
                                React.createElement(atoms_1.Text, { style: styles.contentText }, (_g = current.minutes) === null || _g === void 0 ? void 0 : _g.call(current)))) : null))),
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginTop: 10 } },
                        React.createElement(react_native_1.View, null,
                            React.createElement(react_native_eva_icons_1.Icon, { name: 'smiling-face-outline', fill: color_1.bTaskee, width: 22, height: 22 })),
                        React.createElement(react_native_1.View, null,
                            React.createElement(atoms_1.Text, { style: styles.contentText }, helpers_1.currencyFormat((_h = infoSlice === null || infoSlice === void 0 ? void 0 : infoSlice.InfoList) === null || _h === void 0 ? void 0 : _h.money)))),
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginTop: 10 } },
                        React.createElement(react_native_1.View, null,
                            React.createElement(react_native_eva_icons_1.Icon, { name: 'car-outline', fill: color_1.bTaskee, width: 22, height: 22 })),
                        React.createElement(react_native_1.View, null,
                            React.createElement(atoms_1.Text, { style: styles.contentText }, "Ch\u1EDD thanh to\u00E1n"))),
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginTop: 10 } },
                        React.createElement(react_native_1.View, null,
                            React.createElement(react_native_eva_icons_1.Icon, { name: 'pin-outline', fill: color_1.bTaskee, width: 22, height: 22 })),
                        React.createElement(react_native_1.View, { style: { paddingRight: 20 } },
                            React.createElement(atoms_1.Text, { style: [styles.contentText, { width: 300 }], numberOfLines: 3 }, "C\u00F4ng ty TNHH bTaskee, H\u1EBBm 284/25 L\u00FD Th\u01B0\u1EDDng Ki\u1EC7t, ph\u01B0\u1EDDng 14, Qu\u1EADn 10, Th\u00E0nh ph\u1ED1 H\u1ED3 Ch\u00ED Minh, Vi\u1EC7t Nam")))),
                React.createElement(react_native_1.View, { style: styles.lineBox }),
                React.createElement(react_native_1.View, { style: [
                        styles.firstViewBox,
                        { marginTop: 20, marginLeft: 20, marginRight: 20 }
                    ] },
                    React.createElement(react_native_1.View, { style: styles.button1 },
                        React.createElement(atoms_1.Text, { style: [styles.subText, { color: 'red' }] }, "H\u1EE7y Vi\u1EC7c")),
                    React.createElement(react_native_1.View, { style: [styles.button2, {}] },
                        React.createElement(atoms_1.Text, { style: [styles.subText, { color: 'green' }] }, "Thanh To\u00E1n L\u1EA1i"))),
                React.createElement(react_native_1.View, { style: [styles.center, { paddingTop: 20, paddingBottom: 20 }] },
                    React.createElement(atoms_1.Text, { style: {
                            textAlign: 'center',
                            fontSize: 14,
                            color: '#98eba8'
                        } }, "C\u00E1c CTV bTaskee \u0111\u1EC1u c\u00F3 \u00EDt nh\u1EA5t 1 m\u0169i vaccine"))))))));
};
exports["default"] = react_1.memo(DetailScreen);
var styles = react_native_1.StyleSheet.create({
    viewBox: {
        marginTop: 20,
        paddingVertical: 'auto',
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: color_1.bTaskee,
        shadowOpacity: 4,
        shadowRadius: 2,
        shadowOffset: {
            height: 0.5,
            width: 0.3
        },
        borderRightColor: color_1.bTaskee,
        borderEndColor: color_1.bTaskee,
        width: 'auto'
    },
    firstViewBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemFirstViewBox: {
        flexDirection: 'column'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: color_1.black
    },
    subText: {
        fontSize: 14,
        color: '#a19f9f'
    },
    body: {
        marginLeft: 15,
        marginRight: 15
    },
    button: {
        backgroundColor: '#faa364',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 7,
        paddingLeft: 15,
        paddingRight: 15,
        height: 35
    },
    lineBox: {
        height: 1,
        backgroundColor: '#969696',
        alignSelf: 'stretch',
        marginTop: 10
    },
    contentText: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: 'center',
        color: '#3b3b3b'
    },
    flexItem: {
        flexDirection: 'column',
        marginLeft: 15,
        marginTop: 15
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button1: {
        backgroundColor: '#f5c7ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#787a79',
        paddingTop: 7,
        paddingLeft: 15,
        paddingRight: 15,
        height: 35
    },
    button2: {
        backgroundColor: '#98eba8',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#787a79',
        paddingTop: 7,
        paddingLeft: 15,
        paddingRight: 15,
        height: 35
    }
});
