import renderer from 'react-test-renderer'

import ToolBar from '../toolbar.component'

test('matches snapshot', () => {
    const tree = renderer.create(<ToolBar />).toJSON();
    expect(tree).toMatchSnapshot();
})