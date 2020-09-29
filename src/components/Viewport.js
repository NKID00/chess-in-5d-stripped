import { CustomPIXIComponent } from 'react-pixi-fiber';
import { Viewport as PixiViewport} from 'pixi-viewport';

const behavior = {
  customDisplayObject: (props) => {
    var viewport = new PixiViewport({
      screenWidth: props.app.renderer.width,
      screenHeight: props.app.renderer.height,
      worldWidth: props.worldWidth ? props.worldWidth : 1000,
      worldHeight: props.worldHeight ? props.worldHeight : 1000,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      stopPropagation: false
    });
    viewport.interactive = true;

    if(props.drag) { viewport.drag(); }
    if(props.pinch) { viewport.pinch(); }
    if(props.wheel) { viewport.wheel(); }
    if(props.decelerate) { viewport.decelerate(); }
    viewport.zoomPercent(1.5, false);
    return viewport;
  },
  customApplyProps: (viewport, oldProps, newProps) => { return viewport; },
  customWillDetach: (viewport) => { return viewport; }
};

const Viewport = CustomPIXIComponent(behavior, 'Viewport');
export default Viewport;
