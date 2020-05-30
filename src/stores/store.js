import { Store } from 'react-native-nub';
import rootReducer from '../reducers';
/*  the "store" will look like so:
    {
        info: {
            version: string,
            releasedate: datetime
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        current: {
            battle: int,
            turn: int,
			player: int,
            phase: int,
            victory: {
                player1: int,
                player2: int
            }
        }
    }
*/
const store = Store(rootReducer);

export default store;