import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem'
import theme from '../theme'
import useRepositories from '../hooks/useRepositories'
import { useHistory } from 'react-router-native'
import { useDebounce } from 'use-debounce'
import DropDownPicker from 'react-native-dropdown-picker'
import TextInput from './TextInput'

const styles = StyleSheet.create({
  separator: {
    height: theme.distance.small,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  console.log('start rendering Repository List')
  let history = useHistory()
  const [order,setOrder] = useState({orderBy:'CREATED_AT',orderDirection:'ASC'})
  const [filter,setFilter] = useState('')
  const [filterValue] = useDebounce(filter,500)
  const payload = {...order,searchKeyword: filterValue}
  console.log(payload)
  const {data,loading, error} = useRepositories(payload)
  if (loading) return null
  if (error) return null;
  const repositories = data.repositories
  // console.log(data)
  // const repositories = data.repositories
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []
  return (
    <View style={{marginTop: -10}}>
      <TextInput
      onChangeText={text => setFilter(text)}
      value={filter}
      style={{height: 40,fontSize: theme.fontSizes.body}}
      />
      <DropDownPicker
          items={[
            {label:'Latest Repositories', value:{orderBy:'CREATED_AT',orderDirection:'ASC'}},
            {label:'Oldest Repositories', value:{orderBy:'CREATED_AT',orderDirection:'DESC'}},
            {label:'Highest Rated Repositories', value:{orderBy:'RATING_AVERAGE',orderDirection:'DESC'}},
            {label:'Lowest Rated Repositories', value:{orderBy:'RATING_AVERAGE',orderDirection:'ASC'}},
          ]}
          style={{backgroundColor: theme.colors.mainBackground}}
          containerStyle={{height: 40}}
          labelStyle={{fontWeight: theme.fontWeights.bold}}
          placeholderStyle={{fontWeight: theme.fontWeights.normal}}
          onChangeItem={item => setOrder(item.value)}
          placeholder="Select sorting method..."
      />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => history.push(`/repository/${item.id}`)}>
            <RepositoryItem repository={item}/>
          </TouchableOpacity> }
      />
    </View>
  );
};

export default RepositoryList
