import { flowRight, map } from 'lodash';
import React, { Component } from 'react';
import dimensions from 'react-dimensions';
import * as d3 from 'd3';

import { Loader } from 'components/shared';
import { wrapMainLayout } from 'components/layouts';

import PersonNode from './person-node';

export class TreePage extends Component {
  static displayName = 'TreePage';

  computeTreeData(treeData, containerWidth) {
    treeData = treeData.toJS();

    const treeLayout = d3.layout.tree().size([containerWidth, 0]);
    const nodesList = treeLayout.nodes(treeData).reverse();
    nodesList.forEach(d => {
      d.y = d.depth * 200; // 200px is the gap space between each level
      d.y += 80; // translate 80px down for drawing the person image
    });
    const linksList = treeLayout.links(nodesList);

    return { nodesList, linksList };
  }

  render() {
    const { treeData, containerWidth } = this.props;

    if (!treeData) {
      return <Loader />;
    }

    const { nodesList, linksList } = this.computeTreeData(treeData, containerWidth);

    return (
      <div>
        <svg height="1000" width={containerWidth}>
          <g>
            <g transform="translate(0,0)">
              {map(nodesList, (personNode, key) => (
                <PersonNode {...{ key, personNode }} />
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

const enhance = flowRight([wrapMainLayout, dimensions()]);
export default enhance(TreePage);
