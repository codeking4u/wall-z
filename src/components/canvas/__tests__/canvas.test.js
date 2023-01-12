import renderer from 'react-test-renderer'

import Canvas from '../canvas.component'

test('matches snapshot', () => {
    const tree = renderer.create(<Canvas />).toJSON();
    expect(tree).toMatchSnapshot();
})