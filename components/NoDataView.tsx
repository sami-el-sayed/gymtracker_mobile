import React, { } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props{
    option:string
}


const NoDataView:React.FC<Props> = ({option}) => {
    
  return (
    <View style={styles.NoDataContainer}>
        <Text style={styles.Emote}>:(</Text>
        <View>
        <Text style={styles.Paragraph}>Couldn't find any {option}!</Text>
          <Text style={styles.Paragraph}>Add some Exercises and then add your Workouts based on them!</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    NoDataContainer:{
        width:"90%",
        padding:20,
        marginBottom:40,
        textAlign:"center",
        flexDirection:"row",
      },
      Paragraph:{
        color:"#d4d4d4",
      },
      Emote:{
        color:"#d4d4d4",
        marginRight:20,
        fontSize:40
      }
});

export default NoDataView;
