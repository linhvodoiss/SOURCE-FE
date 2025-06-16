'use client'

import styled, { css } from 'styled-components'
import { scaleMediaStyles } from '~/utils/styles'

export const WebHeaderStyled = styled.div<{ $mobileWidth?: number }>`
  ${({ $mobileWidth }) =>
    scaleMediaStyles($mobileWidth, {
      base: css``,
      landscape: css`
        .header__container {
        }
      `,
      portrait: css`
        .header__container {
        }
      `,
    })}
`
