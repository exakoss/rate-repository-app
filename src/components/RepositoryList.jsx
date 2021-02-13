import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem'
import theme from '../theme'
import useRepositories from '../hooks/useRepositories'
import { useHistory } from 'react-router-native'

const styles = StyleSheet.create({
  separator: {
    height: theme.distance.small,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  console.log('start rendering Repository List')
  let history = useHistory()
  const {data,loading, error} = useRepositories()
  if (loading) return null
  if (error) return null;
  const repositories = data.repositories
  // console.log(data)
  // const repositories = data.repositories
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({item}) =>
        <TouchableOpacity onPress={() => history.push(`/repository/${item.id}`)}>
          <RepositoryItem repository={item}/>
        </TouchableOpacity> }
    />
  );
};

export default RepositoryList
