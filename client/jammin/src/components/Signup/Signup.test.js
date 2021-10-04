import {render, screen} from '@testing-library/react';
import Signup from './SignUp';


describe('Signup component', ()=> {
  
  test('should match the snapshot', () => {
    const {container} = render(<Signup
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  })
  
  test('Should render the headings', () => {
    render (<Signup
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Create your account/);
    screen.getByPlaceholderText(/First name/);
    screen.getByPlaceholderText(/Last name/);
    screen.getByPlaceholderText(/Email/);
    screen.getByPlaceholderText(/Password/);
    screen.getByRole('button', { name: 'JOIN NOW' });
  })

})

// add tests for both functions

