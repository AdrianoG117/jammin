import {render, screen} from '@testing-library/react';
import Login from './LogIn';


describe('Signup component', ()=> {
  
  test('should match the snapshot', () => {
    const {container} = render(<Login
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  })
  
  test('Should render the headings', () => {
    render (<Login
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    //title
    screen.getByPlaceholderText(/Email/);
    screen.getByPlaceholderText(/Password/);
    screen.getByRole('button', { name: 'LOG IN' });
  })

})

// add tests for both functions

