import React , { useRef,Component } from 'react';
import { StyleSheet, View,KeyboardAvoidingView,Text} from 'react-native';

import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Font } from 'expo';

export default class MultiSelectExample extends Component {
  
  state = {
    selectedItems : [],
  };

  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  constructor(props){
    super(props)
    props.input.value = props.selectedItems;
    this.input = props.input;
    this.meta = props.meta;
    this.inputProps = props;
  }
  
  render() {
  this.props.input.onChange(this.state.selectedItems);
   return(
   <KeyboardAvoidingView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainerStyle}>
     
      <SectionedMultiSelect
        
        flatListProps={{nestedScrollEnabled: true}}
        // styleDropdownMenu={styles.pickerContainer2}
        // styleDropdownMenuSubsection={styles.pickerContainer2inside}
        // styleInputGroup={styles.pickerContainer2}
        // styleItemsContainer={{...styles.listContainer,marginTop:5,marginBottom:5}}
        // styleRowList={{paddingTop:5,paddingBottom:5,borderTopColor:'gray',borderTopWidth:0.5}}
        hideTags={this.inputProps.single}
        items={this.inputProps.options}
        uniqueKey="value"
        ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        selectText={this.inputProps.selectedText}
        searchInputPlaceholderText={this.inputProps.placeholderText}
        fontSize={16}
        onAddItem={ () => {}}
        canAddItems={false}
        flatListProps={{nestedScrollEnabled: true}}
        tagRemoveIconColor="#00C331"
        tagBorderColor="#00C331"
        tagTextColor="#00C331"
        selectedItemTextColor="black"
        selectedItemIconColor="black"
        itemTextColor="gray"
        displayKey="label"
        searchInputStyle={{ color: 'black' }}
        submitButtonColor="#00C331"
        selectedText={"seleccionados"}
        noResultsComponent={<Text>Lo siento. No hay resultados.</Text>}
        searchPlaceholderText={this.inputProps.placeholderText + "..."}
        modalWithSafeAreaView={true}
        confirmText={this.inputProps.placeholderText}
        // submitButtonText={this.inputProps.placeholderText}
        single={this.inputProps.single}
        colors={{primary:"#00C331",chipColor:"#00C331"}}
        styles={{container: {
          flex: 0.5, },selectToggle:styles.pickerContainer2,selectToggleText:{fontSize:16,color:'gray'}}}
      />
      
      </View>
      
    </View>
    </KeyboardAvoidingView>
  
  

  );
  }
}


const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
   
    
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  }, pickerContainer2: {
    borderWidth: 1,
    marginRight:10,
    marginLeft:10,
    height:58,
    borderRadius: 10,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:15,
    marginBottom:10,
    backgroundColor: '#f5f5f5',
    borderColor: 'gray',
  }, listContainer: {
    borderWidth: 1,
    marginRight:10,
    marginLeft:10,
   
    
    borderRadius: 10,
    
    backgroundColor: '#f5f5f5',
    borderColor: 'gray',
  }
  , pickerContainer2inside: {
    
    
    
    borderRadius: 10,
    paddingRight:10,
    paddingLeft:10,

    backgroundColor: '#f5f5f5',
  },
});