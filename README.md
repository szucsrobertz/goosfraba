# Data visualization app

## Library used

`Apollo Grapghql` - to consume the Grapghql endpoint
`Visx` - for data visualization
`Typescript` -for type checking(In my opinion prevents a lot of bugs)

## Summary

This is an app that makes a request to an GrapghQl endpoint and retrieves a given number of posts. To change the number of posts, modify `NUMBER_OF_POSTS` constants from the `constants` file located in `configs` folder. While the data is loading, an appropiate message is displayed. After the data is loaded, the number of posts for each month are counted in the `HomePage` component in a `useEffect` hook, therefore whenever the data changes it will be calculated every time and there will be 2 types of
charts displayed: * bar chart *line graph.

### Chalenges

The biggest challenge for me was to create the graphs components, because I haven't used the `Visx` library before, but with a little time invested in reading the official documentaion I succesfully managed to create two reusable components for data visualization.
