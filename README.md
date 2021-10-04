# jammin

example test of passing props and <Link/> in case useful again:

import {render, screen} from '@testing-library/react';
import Topbar from './Topbar';
import { BrowserRouter as Router } from 'react-router-dom'


describe('Topbar component', ()=> {
  
    const MockTopbar = ({ isSignedUp, setUserData, setIsSignedUp }) => {
        return (
        <Router>
            <Topbar 
                isSignedUp={isSignedUp}
                setUserData={setUserData}
                setIsSignedUp={setIsSignedUp}
            />
        </Router>
        )
    }

  test('should match the snapshot', () => {
    const {container} = render(<MockTopbar isSignedUp={[]}
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  })
  
  test('Should render the headings', () => {
    render (<MockTopbar isSignedUp={[]}
                  setUserData={()=>{}}
                  setIsSignedUpw={()=>{}} />);
    //title
    screen.getByText(/Home/)
    screen.getByText(/Create Jam/)
    screen.getByText(/Find Jam/)
    
  })

})