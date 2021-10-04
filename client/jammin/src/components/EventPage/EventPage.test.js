import {render, screen} from '@testing-library/react';
import EventPage from './EventPage';

const mockProps = {
  userData: null,
  setUserData: () =>{},
  isSignedUp: false,
  setIsSignedUp: ()=>{},
  
  isEventAdded: (jamid) => {
    const arr = [{_id:"615aa8eb25df7e7d9ed72fbc"}];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === jamid) {
        return true;
      }
    }
    return false;
  }
}

describe('EventPage component', ()=> {
  
  test('should match the snapshot', () => {
    const {container} = render(<EventPage  
     userData={mockProps.userData}
                  setUserData={mockProps.setUserData}
                  isSignedUp={mockProps.isSignedUp}
                  setIsSignedUp={mockProps.setIsSignedUp}
    />);
    expect(container.firstChild).toMatchSnapshot();
  })
  
   test('is EventAdded function should return true or false if the event is added or not added', () => {
     expect(mockProps.isEventAdded("615aa8eb25df7e7d9ed72fbc")).toBeTruthy();
    expect( mockProps.isEventAdded("")).toBeFalsy()     
   })
   
  
  test('Should render the headings when user is signed up', () => {
    render (<EventPage  
     userData={mockProps.userData}
                  setUserData={mockProps.setUserData}
                  isSignedUp={mockProps.isSignedUp}
                  setIsSignedUp={mockProps.setIsSignedUp}
    />);
    //if user signed up, then the paritciapte button should render
    //else the pariticpate button should be rendered
    
    //If user is logged in, then check if user has the event added
    //if true then it should show EVENT ADDED else  show PARTICIPATE
    if(mockProps.isSignedUp){
      if(mockProps.isEventAdded('615aa8eb25df7e7d9ed72fbc')){
        screen.getByText(/EVENT ADDED/)   
      }
      if( !mockProps.isEventAdded('')){
        screen.getByText(/PARTICIPATE/)   
      }
      
    }
  })
  
  
  
  test('Should render the headings when user is NOT signed up', () => {
    render (<EventPage  
     userData={mockProps.userData}
                  setUserData={mockProps.setUserData}
                  isSignedUp={mockProps.isSignedUp}
                  setIsSignedUp={mockProps.setIsSignedUp}
    />);
    
    if(mockProps.isSignedUp){
     screen.getByText(/Login to participate/)   
      
    }
  })

})