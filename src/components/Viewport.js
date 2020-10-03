import { CustomPIXIComponent } from 'react-pixi-fiber';
import { Viewport as PixiViewport} from 'pixi-viewport';
import * as PIXI from 'pixi.js';

const behavior = {
  customDisplayObject: (props) => {
    var viewport = new PixiViewport({
      screenWidth: props.app.renderer.width,
      screenHeight: props.app.renderer.height,
      worldWidth: props.worldWidth ? props.worldWidth : 1000,
      worldHeight: props.worldHeight ? props.worldHeight : 1000,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      stopPropagation: false,
      disableOnContextMenu: true
    });
    viewport.interactive = true;

    if(props.blur) { viewport.filters = [new PIXI.filters.BlurFilter(2,2)]; }
    if(props.drag) { viewport.drag(); }
    if(props.pinch) { viewport.pinch({
      noDrag: false
    }); }
    if(props.wheel) { viewport.wheel({
      percent: 0.05,
      smooth: 2
    }); }
    if(props.decelerate) { viewport.decelerate({
      friction: 0.75
    }); }
    viewport.fitHeight(1333);
    viewport.snap(500, 500,
      {
        time: 500,
        removeOnComplete: true,
        removeOnInterrupt: true
      }
    );
    viewport.clampZoom({
      minWidth: 1000,
      minHeight: 1000,
      maxWidth: props.app.renderer.width * 2.2,
      maxHeight: props.app.renderer.height * 2.2
    });
    return viewport;
  },
  customApplyProps: (viewport, oldProps, newProps) => {
    if(oldProps && newProps) {
      if(
        oldProps.worldWidth !== newProps.worldWidth ||
        oldProps.worldHeight !== newProps.worldHeight
      ) {
        console.log('resized')
        viewport.resize(
          newProps.app.renderer.width,
          newProps.app.renderer.height,
          newProps.worldWidth,
          newProps.worldHeight
        );
        viewport.clampZoom({
          minWidth: 1000,
          minHeight: 1000,
          maxWidth: newProps.worldWidth * 2.2,
          maxHeight: newProps.worldHeight * 2.2
        });
      }
      if(
        oldProps.triggerDate !== newProps.triggerDate
      ) {
        viewport.snap(
          (newProps.snapX ? newProps.snapX : 500),
          (newProps.snapY ? newProps.snapY : 500),
          {
            time: 500,
            removeOnComplete: true,
            removeOnInterrupt: true
          }
        );
        var height = (newProps.zoomHeight ? newProps.zoomHeight : 1333);
        if(viewport.worldScreenHeight < height) {
          viewport.snapZoom({
            height: height,
            time: 500,
            removeOnComplete: true,
            removeOnInterrupt: true
          });
        }
      }
      if(newProps.blur) { viewport.filters = [new PIXI.filters.BlurFilter()]; }
      else { viewport.filters = []; }
    }
  },
  customWillDetach: (viewport) => { return viewport; }
};

const Viewport = CustomPIXIComponent(behavior, 'Viewport');
export default Viewport;
