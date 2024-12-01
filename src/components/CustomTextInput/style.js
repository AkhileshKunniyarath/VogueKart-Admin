import { Dimensions, StyleSheet } from "react-native";
import colors from "../common/colors";


const  {width,height} = Dimensions.get('screen');
 const style= StyleSheet.create({
    container: {
        
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightblue,
        padding: width * 0.015,
        borderRadius: 8,
        margin: width * 0.025,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    textInput: {
        flex:1,
        color: colors.black_lvl_3,
        fontSize: 17,
        fontFamily:'Lato-Regular',
    },
    checkText: {
        fontFamily: 'Lato-Regular', 
        color:colors.green,
        fontSize: 18,
    },
    searchIcon:{
        width: width * 0.085,
        height: height * 0.045,
        resizeMode: 'contain',
    },
    icon: {
        width: width * 0.075,
        height: height * 0.025,
        resizeMode: 'contain',
    }
});

export default style;