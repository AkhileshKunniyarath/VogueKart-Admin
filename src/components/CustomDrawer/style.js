import { StyleSheet } from "react-native";
import colors from "../../components/common/colors";


const style = (width, height, isPortrait) => 
    StyleSheet.create({
    mainCon: {
        flex: 1,
        marginVertical: 5, 
        padding:10, 
        overflow: "hidden",
        backgroundColor: colors.white_Bg,
        marginTop: 5,
    },
    accountTouch: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.1,
        paddingVertical: 15,
        // backgroundColor: colors.red,
    },
    accountImgView : {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        backgroundColor: colors.white_Bg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.172,
        height: width * 0.172,
        borderRadius: width * 0.1,
    },
    nameView : {
        marginLeft: 4, 
        width: '75%',
    },
    name : {
        fontFamily: 'Lato-Bold', 
        fontSize: 20,
        color : colors.black,
    },
    email : {
        fontFamily: 'Lato-Regular', 
        fontSize: 15,
        color : colors.black_lvl_2,
    },
    commonMargin : { marginTop: 10,},
    drawerView: {
        marginVertical: 2,
        flexDirection:"row",
        alignItems: 'center', 
        padding: 10,
        justifyContent: 'space-between',
        borderBottomWidth:StyleSheet.hairlineWidth,
    },
    drawerInnerView: {
        flexDirection:"row",
        alignItems: 'center', 
        paddingVertical: 5,
    },
    icon: {
        width: 28, 
        height: 28 , 
        resizeMode: 'contain',
        marginRight: 14,
    },
    drawerText: {
        fontFamily:'Lato-Regular',
        fontSize: 22,
        color: colors.black_lvl_3,
    },
    iconSecond: {
        width: 25, 
        height: 25 , 
        resizeMode: 'contain',
        backgroundColor:colors.white_Bg,
        overflow:'hidden',
        borderRadius: 25/2,
        // right: 10,
    },
    logoutView: {
        borderColor: colors.red, 
        borderWidth: 2, 
        // paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor:colors.white,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 20,
        width:'55%',
        flexDirection: 'row'
    },
    logoutText: {
        fontFamily:'Lato-Black',
        fontSize: 20,
        paddingBottom: 5,
        color: colors.black,
    },
    supportView: {
        borderRadius: 20,
        backgroundColor: colors.green_2,
        padding: 15,
        marginVertical: 15,
    },
    supportHead : {
        fontFamily:'Lato-Black',
        fontSize: 20,
        lineHeight: 30,
        color: colors.iron,
    },
    supportContent: {
        fontFamily:'Lato-Regular',
        fontSize: 16,
        lineHeight: 20,
        color: colors.iron,
    },
    supportTouch: {
        borderRadius: 20,
        backgroundColor: colors.green,
        padding: 10,
        marginVertical: 15,
        width: '60%',
        justifyContent:'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    supportText: {
        color: colors.white,
        fontFamily:'Lato-Bold',
        fontSize: 18,

    }
});

export default style;