import React from 'react'
import {View, Button, Text, FlatList, StyleSheet} from 'react-native'
import RepositoryItem from './RepositoryItem'
import * as WebBrowser from 'expo-web-browser'
import { useParams } from 'react-router-native'
import {SINGLE_REPOSITORY} from '../graphql/queries'
import  {useQuery } from '@apollo/react-hooks'
import theme from '../theme'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  separator: {
    height: theme.distance.small,
  },
  reviewItem: {
    backgroundColor: theme.colors.textWhite
  },
  reviewList: {
    marginTop: theme.distance.small,
    marginBottom: theme.distance.small,
  },
  singleRepository: {
    flex: 1
  },
  ratingContainer: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: theme.distance.small,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={styles.reviewItem}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.ratingContainer}>
          <Text style={{color: theme.colors.primary}}>{review.rating}</Text>
        </View>
        <View>
          <Text style={{fontWeight: theme.fontWeights.bold}}>{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), 'PPP')}</Text>
        </View>
      </View>
      <Text>
        {review.text}
      </Text>
    </View>
  )
}

const SingleRepository = () => {
  let { id } = useParams()
  const {data, loading, error} = useQuery(SINGLE_REPOSITORY,{variables:{id: id}, fetchPolicy:'cache-and-network'})
  if (loading) return null
  if (error) return null
  const repository = {...data.repository}
  const reviews = repository.reviews.edges.map(edge => edge.node)
  console.log(`Review list is ${reviews}`)
  const handleClick = () => {
    WebBrowser.openBrowserAsync(`${repository.url}`)
  }

  return(
    <View style={styles.singleRepository}>
      <RepositoryItem repository={repository}/>
      <Button title='Open in Github' onPress={handleClick}/>
      <View style={styles.reviewList}>
        <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ReviewItem review={item}/>}
        />
      </View>
    </View>
  )
}

export default SingleRepository
