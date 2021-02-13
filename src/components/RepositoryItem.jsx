import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import Text from './Text'
import theme from '../theme'

const Summary = ({repository}) => {
  return (
    <View style={styles.summary}>
    <Image style={styles.avatar} source={{uri: repository.ownerAvatarUrl}}/>
    <View style={{paddingLeft: theme.distance.small, marginBottom: theme.distance.tiny, flexShrink: 1}}>
      <Text color='textPrimary' fontWeight='bold' testID='repositoryFullName'>{repository.fullName}</Text>
      <Text color='textSecondary' style={{padding: theme.distance.tiny, paddingLeft: 0}}>{repository.description}</Text>
      <Text color='textWhite' style={{backgroundColor: theme.colors.primary, alignSelf: 'flex-start', borderRadius: 3}}>{repository.language}</Text>
    </View>
  </View>)
};

const SingleStat = ({title, quantity}) => {
  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }
  return(
    <View>
      <Text color='textPrimary' fontWeight='bold'>{kFormatter(quantity)}</Text>
      <Text color='textSecondary'>{title}</Text>
    </View>
  )
}

const Stats = ({repository}) => {
  return(
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <SingleStat title='Stars' quantity={repository.stargazersCount}/>
      <SingleStat title='Forks' quantity={repository.forksCount}/>
      <SingleStat title='Reviews' quantity={repository.reviewCount}/>
      <SingleStat title='Rating' quantity={repository.ratingAverage}/>
    </View>
  )
};

const RepositoryItem = ({repository}) => {
  // console.log(repository.id)

  return(
    <View style={styles.item}>
      <Summary repository={repository}/>
      <Stats repository={repository}/>
      {/*<Text>Stars:{repository.stargazersCount}</Text>*/}
      {/*<Text>Forks:{repository.forksCount}</Text>*/}
      {/*<Text>Reviews:{repository.reviewCount}</Text>*/}
      {/*<Text>Rating:{repository.ratingAverage}</Text>*/}
    </View>
  )
}

styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between'
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5
  },
  summary: {
    display:'flex',
    flexDirection: 'row',
    padding: 5
  }
});

export default RepositoryItem
