import {render, screen} from '@testing-library/react';
import Dashboard from './Dashboard';


describe('Topbar component', ()=> {
  
  test('should match the snapshot', () => {
    const {container} = render(<Dashboard
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  })

  test('Should render two titles when user has coming events', () => {
    render (<Dashboard userData={true}
        setUserData={()=>{}}
        setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Hi there {}/)
    screen.getByText(/Check out your coming events below: /)
    })
    // also need to add testing to see MyJamsItem is rendered

  test('Should render two titles when user has no coming events', () => {
    render (<Dashboard userData={false}
        setUserData={()=>{}}
        setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Hi {}/)
    screen.getByText(/You have no jams added yet, go to the Find Jam section to find events around you/)
    })
})

