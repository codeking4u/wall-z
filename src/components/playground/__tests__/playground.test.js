import renderer from 'react-test-renderer'

import PlayGround from '../playground.component';

test('matches snapshot', () => {
    const tree = renderer.create(<PlayGround />).toJSON();
    expect(tree).toMatchSnapshot();
})