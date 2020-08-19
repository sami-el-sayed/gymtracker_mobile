import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';

interface Props{
    noteProps:string;
    saveNote:(noteToSave:string) => void
    setKeyboardEnabled:Function,
}


const NoteView:React.FC<Props> = ({noteProps,saveNote,setKeyboardEnabled}) => {
    
 const [note,setNote] = useState<string>(noteProps);

 const onChangeHandler = (value:string) => {
    setNote(value)
 }

 const saveHandler = () => {
    saveNote(note.trim())
 }

  return (
    <TouchableOpacity onPress={Keyboard.dismiss}>
    <View >
        <View style={styles.Title}>
            <Text style={styles.TitleText}>Note:</Text>
        </View>
        <TextInput
              onFocus={()=>setKeyboardEnabled(false)}
              style={styles.TextInput}
              multiline
              numberOfLines={8}
              onChangeText={text => onChangeHandler(text)}
              value={note}
          />
        <TouchableOpacity
         style={styles.Button}
         onPress={saveHandler}
         >
          <Text style={styles.ButtonText}>Save</Text>
        </TouchableOpacity>
    </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
    Title:{
        backgroundColor:"#3b3b3b",
        width:"26%",
        marginBottom:10,
        marginTop:10,
        fontSize:16,
        paddingLeft:10,
        color:"#fff"
    },
    TitleText:{
        color:"#fff",
        fontSize:24,
        fontWeight:"700",
        textTransform:"uppercase"
    },
    TextInput:{
        width:"90%",
        backgroundColor:"#3b3b3b",
        color:"#fff",
        fontSize:16,
        alignItems:"flex-start"
    },
    Button:{
        alignItems: 'center',
        backgroundColor: '#3b3b3b',
        padding: 10,
        marginTop:40
    
      },
    ButtonText:{
        fontSize:16,
        color:"#d4d4d4",
        textTransform:"uppercase"
    },
    Picker:{
        color:"#fff",
    },
    PickerView:{
        backgroundColor: '#3b3b3b',
    }
});

export default NoteView;
