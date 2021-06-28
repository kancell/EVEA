import * as React from 'react';
import { useMemo, useEffect, useState } from 'react';
import { Scene, PointLayer, CityBuildingLayer } from '@antv/l7';
import { GaodeMapV2, Mapbox } from '@antv/l7-maps';

export default React.memo(function Map() {
  const [data, setData] = useState();
  const [buildData, setBuildData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/32e1f3ab-8588-46cb-8a47-75afb692117d.json',
      );
      const raw = await response.json();
      setData(raw);

      const buildRes = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/972566c5-a2b9-4a7e-8da1-bae9d0eb0117.json',
      );
      const buildRaw = await buildRes.json();
      setBuildData(buildRaw);
    };
    //fetchData();
  }, []);
  let scene;
  useEffect(() => {
    scene = new Scene({
      id: 'map',
      map: new GaodeMapV2({
        style: 'dark',
        center: [120.173104, 30.244072],
        pitch: 70.41138037735848,
        zoom: 19,
        minZoom: 10,
        rotation: 2.24, // 358.7459759480504
        token: 'd3c709f8ace7b28d23355884c66625f1',
      }),
    });
    const layer = new PointLayer({
      zIndex: 2,
    });
  }, []);

  return (
    <div className="h-exactH">
      <div id="map"></div>
    </div>
  );
});
