import { makeStyles } from '@material-ui/core/styles';

const squareSize = 25;

const useStyles = makeStyles({
  board: {
    background: '#EEBB1C',
    padding: 2 * squareSize,
    borderRadius: 10,
    border: '1px solid #886307',
    '-webkit-box-shadow': '5px 5px 15px 0px rgba(0,0,0,0.35)',
    '-moz-box-shadow': '5px 5px 15px 0px rgba(0,0,0,0.35)',
    'box-shadow': '5px 5px 15px 0px rgba(0,0,0,0.35)',
  },

  boardInner: {
    position: 'relative',
  },

  backgroundGrid: {
    borderCollapse: 'collapse',
    border: '3px solid black',
  },

  backgroundGridCell: {
    border: '1px solid black',
    padding: squareSize,
  },

  grid: {
    borderCollapse: 'collapse',
    border: '3px solid transparent',
    position: 'absolute',
    top: -squareSize,
    left: -squareSize,
  },

  stoneCell: {
    border: '1px solid transparent',
    padding: squareSize,
    position: 'relative',
  },

  stone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 1,
    borderRadius: squareSize,

    '&:hover': {
      // background: 'hotpink',
    },
  },

  whiteStone: {
    border: '1px solid #333',
    background:
      'linear-gradient(135deg, rgba(238,238,238,1) 25%, rgba(238,238,238,1) 65%, rgba(204,204,204,1) 100%);',
  },

  blackStone: {
    border: '1px solid #333',
    background:
      'linear-gradient(315deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(111,111,111,1) 100%);',
  },
});

export default useStyles;
