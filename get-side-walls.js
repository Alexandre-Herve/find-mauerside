import mauer from './data/coord.json';
import toxi from 'toxiclibsjs';

const Vec2D = toxi.geom.Vec2D;
const Circle = toxi.geom.Circle;

const step = 0.0002;

function getLongLat(point) {
  return [point.long, point.lat]
}

function getVector(point) {
  return new Vec2D(...getLongLat(point));
}

function getThreePoints(curve, index) {
  return [
    getVector(curve[index - 1]),
    getVector(curve[index]),
    getVector(curve[index + 1])
  ];
}

function getCircle(curve, index) {
  return Circle.from3Points(
    ...getThreePoints(curve, index)
  );
}

function getLine(curve, index) {
  const Pn = getVector(curve[index]);
  const Cn = getCircle(curve, index);
  const On = { x: Cn.x, y: Cn.y };

  const vect = {
    x: Pn.x - On.x,
    y: Pn.y - On.y
  }

  const norm = Math.sqrt(Math.pow(vect.x, 2) + Math.pow(vect.y, 2));

  return {
    x: vect.x / norm,
    y: vect.y / norm
  }
}

function getAngle(curve, index) {
  return find_angle(
    ...getThreePoints(curve, index)
  );
  function find_angle(A,B,C) {
    const AB = { x: B.x - A.x, y: B.y - A.y };
    const BC = { x: C.x - B.x, y: C.y - B.y };
    return Math.atan2(BC.y, BC.x) - Math.atan2(AB.y, AB.x);
  }
}

function getPoints(curve, index) {
  try {
  const angle = getAngle(curve, index);
  const sign = angle / Math.sqrt(Math.pow(angle, 2));
  const line = getLine(curve, index);
  const Pn = getVector(curve[index]);

  const east = {
    x: Pn.x + sign * line.x * step,
    y: Pn.y + sign * line.y * step
  };

  const west = {
    x: Pn.x - sign * line.x * step,
    y: Pn.y - sign * line.y * step
  };

  return [ east, west ]

  } catch (err) {
      console.log('err', err);
      return [{x: 0, y: 0}, {x: 0, y: 0}];
  }
}

export default function() {
  return mauer.map(function(point, index) {
    if (index > 0 && index < mauer.length - 1) {
      return getPoints(mauer, index);
    } else {
      return [{x: 0, y: 0}, {x: 0, y: 0}];
    }
  });
}
