import { map, maxBy } from 'lodash';
import React, { Component } from 'react';
import dimensions from 'react-dimensions';
import * as d3 from 'd3';
import { Input } from 'reactstrap';

import { Loader } from 'components/shared';

import PersonNode from './person-node';
import PersonLink from './person-link';

export class TreePage extends Component {
  static displayName = 'TreePage';

  computeTreeData(treeData, containerWidth) {
    treeData = treeData.toJS();

    const treeLayout = d3.layout.tree().size([containerWidth, 0]);
    const nodeList = treeLayout.nodes(treeData).reverse();
    nodeList.forEach(d => {
      d.y = d.depth * 200; // 200px is the gap space between each level
      d.y += 80; // translate 80px down for drawing the person image
    });
    const linkList = treeLayout.links(nodeList);

    return { nodeList, linkList };
  }

  render() {
    const {
      treeData,
      containerWidth,
      toggleChildren,
      rootPersonId,
      onMarriagesToggle,
      marriagesEnabled
    } = this.props;

    if (!treeData) {
      return <Loader />;
    }

    const { nodeList, linkList } = this.computeTreeData(treeData, containerWidth);
    const deepestPerson = maxBy(nodeList, node => node.path.length);
    const treeDepth = deepestPerson.path.length;

    return (
      <div>
        <div className="container">
          <Input
            type="checkbox"
            checked={marriagesEnabled}
            onChange={e => onMarriagesToggle(e.target.checked)}
          />
          Hiện vợ/chồng
        </div>
        <svg height={200 * treeDepth + 160} width={containerWidth}>
          <g>
            <g transform="translate(0,0)">
              {map(linkList, (personLink, key) => (
                <PersonLink {...{ key, personLink }} />
              ))}
            </g>
            <g transform="translate(0,0)">
              {map(nodeList, (personNode, key) => (
                <PersonNode
                  {...{ key, personNode, toggleChildren, rootPersonId, marriagesEnabled }}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default dimensions()(TreePage);
