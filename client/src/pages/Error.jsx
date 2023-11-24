import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import ErrorIllustration from '@/assets/error_boy_labyrinth.png'
import { Stack } from '@mui/material'

export default function Error() {
    return (
        <Container>
            <Stack alignItems="center">
                <Stack justifyContent="center" direction="row">
                    <Box>
                        <img src={ ErrorIllustration } style={ { aspectRatio: '1 / 1', minWidth: '300px', flex: '1', maxWidth: '500px' } } />
                    </Box>
                </Stack>
                <Box textAlign="center">
                    <Typography>Error 404</Typography>
                    <h1>
                        Resource not found
                    </h1>
                </Box>
            </Stack>
        </Container>
    )
}
