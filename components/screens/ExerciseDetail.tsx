import React from 'react';
import {StyleSheet,Text} from 'react-native';

interface Props {
    exercise:string
}


const ExerciseDetail:React.FC<Props> = () => {

  return (
    <>
      <Text>Hello to Exercise Detail</Text>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default ExerciseDetail;
