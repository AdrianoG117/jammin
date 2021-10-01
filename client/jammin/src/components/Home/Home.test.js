import {render, screen} from '@testing-library/react';
import Home from './Home';


describe('Home component', ()=> {
  
  test('should match the snapshot', () => {
    const {container} = render(<Home jams={[]}
                  setJams={()=>{}}
                  setHasSearch={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  })
  
  test('Should render the headings', () => {
    render (<Home jams={[]}
                  setJams={()=>{}}
                  setHasSearch={()=>{}} />);
    //title
    screen.getByText(/JAMMIN'/)
    screen.getByText(/Music is meant to be shared./)
    screen.getByText(/CREATE YOUR JAM/)
    screen.getByText(/FIND A JAM/)
  })

})