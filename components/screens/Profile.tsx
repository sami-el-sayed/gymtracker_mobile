import React from 'react';
import {StyleSheet,Text, TouchableOpacity} from 'react-native';
import clearAppData from '../helpers/clearAppData';


const Profile = () => {
  return (
    <>
     <TouchableOpacity
      style={styles.Button}
      onPress={()=>clearAppData()} 
     >
       <Text>
          CLEAR APP DATA DEBUG
       </Text>
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  Button:{
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    padding: 10,
    marginTop:5,
  },
});

export default Profile;
