import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = ({ children, m, mt, mb, mr, ml, mv, mh }) => {
  let margin = {};

  if (m) {
    let margins = m.split(' ');
    margins = margins.map(margin => parseInt(margin));

    if (margins.length === 1) {
      margin = { t: margins[0], b: margins[0], l: margins[0], r: margins[0] };
    } else if (margins.length === 2) {
      margin = { t: margins[0], b: margins[0], l: margins[1], r: margins[1] };
    } else if (margins.length === 4) {
      margin = { t: margins[0], r: margins[1], b: margins[2], l: margins[3] };
    } else {
      margin = { t: 0, r: 0, b: 0, l: 0 };
    }
  }

  if (mt) margin.t = parseInt(mt);
  if (mb) margin.b = parseInt(mb);
  if (mr) margin.r = parseInt(mr);
  if (ml) margin.l = parseInt(ml);

  if (mv) {
    margin.t = parseInt(mv);
    margin.b = parseInt(mv);
  }

  if (mh) {
    margin.l = parseInt(mh);
    margin.r = parseInt(mh);
  }

  return (
    <View
      style={{
        marginTop: margin.t,
        marginBottom: margin.b,
        marginLeft: margin.l,
        marginRight: margin.r
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Spacer;