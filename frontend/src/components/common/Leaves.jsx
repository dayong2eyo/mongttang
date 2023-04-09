import React from 'react';
import './Leaves.css';
import Leaf1 from '../../assets/images/Leaf02.svg';
import Leaf2 from '../../assets/images/Leaf04.svg';
// import Leaf3 from '../../assets/images/SingleLeaf02.svg';
import Leaf4 from '../../assets/images/Leaf05.svg';

function Leaves() {
  return (
    <div>
      <div className="set">
        <div>
          <img src={Leaf4} alt="" />
        </div>
      </div>
      <div className="set set2">
        <div>
          <img src={Leaf2} alt="" />
        </div>
        <div>
          <img src={Leaf4} alt="" />
        </div>
        <div>
          <img src={Leaf2} alt="" />
        </div>
      </div>
      <div className="set set3">
        <div>
          <img src={Leaf4} alt="" />
        </div>
        <div>
          <img src={Leaf2} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Leaves;
