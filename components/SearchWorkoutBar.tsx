import React,{useState} from 'react';
import {StyleSheet,Text, View, Image, TouchableOpacity} from 'react-native';


interface Props{
    filterWorkouts: (option:string)=>void
    showSearch:boolean,
    searchDate:Date | undefined,
    setShowSearch:(val:boolean)=>void,
    setShowDatePicker:(val:boolean)=>void

}
//View of single Workout 
const SearchWorkoutBar:React.FC<Props> = ({filterWorkouts,showSearch,searchDate,setShowDatePicker,setShowSearch}) => { 
  
  return (
    <View style={styles.SearchContainer}>
        {showSearch ? 
        <View style={styles.Search}>
          <TouchableOpacity
          style={styles.Button}
          onPress={()=>setShowDatePicker(true)}
          >
            <Text style={styles.ButtonTextDate}>
              {searchDate ? `${(searchDate.getMonth()+1)+'-'+searchDate.getDate()+'-'+searchDate.getFullYear()}` : "Pick Date"}</Text>
              </TouchableOpacity>
              {searchDate ?
              <View style={styles.searchButtons}>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("before")}
                >
                 <Text style={styles.SearchButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("after")}
                >
                  <Text style={styles.SearchButtonText}>{">"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("equals")}
                >
                  <Text style={styles.SearchButtonText}>{"="}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.SearchButton}
                onPress={()=>filterWorkouts("none")}
                >
                  <Text style={styles.SearchButtonText}>{"X"}</Text>
                </TouchableOpacity>
              </View>
              :
              <View/>
              }

        </View>
        :
        <TouchableOpacity
         style={styles.Button}
         onPress={()=>setShowSearch(true)}
        >
          <Text style={styles.ButtonText}>Search Workouts</Text>
        </TouchableOpacity>
        }
      </View>
  );
};

const styles = StyleSheet.create({
    SearchContainer:{
        backgroundColor : "#3b3b3b",
        color:"#fff",
        fontSize:16,
        marginBottom:15
      },
      Search:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10
      },
      searchButtons:{
        flexDirection:"row",
        alignItems: 'center',
    
      },
      SearchButton:{
        backgroundColor: '#3b3b3b',
        paddingLeft: 20,
        paddingRight: 20,
      },
      SearchButtonText:{
        fontSize:20,
        color:"#d4d4d4",
        textTransform:"uppercase"
      },
      ButtonTextDate:{
        fontSize:18,
        fontWeight:"700",
        color:"#d4d4d4",
        textTransform:"uppercase"
      },
      Button:{
        alignItems: 'center',
        backgroundColor: '#3b3b3b',
        padding: 10,
        marginTop:5,
      },
      ButtonText:{
        fontSize:16,
        color:"#d4d4d4",
        textTransform:"uppercase"
      },
});

export default SearchWorkoutBar;
