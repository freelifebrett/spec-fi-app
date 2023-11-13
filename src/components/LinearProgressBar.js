import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LinearProgressBar = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 20,
    borderRadius: 10
  }));

function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" ml={3} mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35} mr={2}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  export default LinearProgressBar;