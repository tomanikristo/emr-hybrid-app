import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import RecentDetails from '../screens/RecentDetails';
import AllDetails from './AllDetails';
import { Ionicons } from '@expo/vector-icons'




function DetailsOverview() {
    const ButtomTabs = createBottomTabNavigator()

    return (
        <ButtomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: 'white',
                tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                tabBarActiveTintColor: 'white',

                headerRight: ({ tintColor }) => (
                    < IconButton
                        icon="add"
                        size={32}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate('ManageDetails')
                        }} />
                ),
            })}
        >
            <ButtomTabs.Screen
                name='RecentDetails'
                component={RecentDetails}
                options={{
                    title: 'Recently added',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
                }}
            />
            <ButtomTabs.Screen
                name='AllDetails'
                component={AllDetails}
                options={{
                    title: 'EMR',
                    tabBarLabel: 'All details',
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-sharp" size={size} color={color} />
                }} />
        </ButtomTabs.Navigator >
    )
}

export default DetailsOverview;