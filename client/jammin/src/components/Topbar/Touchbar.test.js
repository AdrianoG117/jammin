import {render, screen} from '@testing-library/react';
import Topbar from './Topbar';


describe('Topbar component', ()=> {
  
  test('should match the snapshot', () => {
    const {container} = render(<Topbar isSignedUp={[]}
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  })
  
  test('Should render the headings', () => {
    render (<Topbar isSignedUp={[]}
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Home/)
    screen.getByText(/Create Jam/)
    screen.getByText(/Find Jam/)
  })

  test('Should render Dashboard and Log Out if signed up', () => {
    render (<Topbar isSignedUp={true}
        setUserData={()=>{}}
        setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Dashboard/)
    screen.getByText(/Log Out/)
    })

  test('Should render Login and Sign up if not signed up', () => {
    render (<Topbar isSignedUp={false}
        setUserData={()=>{}}
        setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Login/)
    screen.getByText(/Sign up/)
    })
})

