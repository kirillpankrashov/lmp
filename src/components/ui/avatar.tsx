import * as AvatarPrimitive from '@radix-ui/react-avatar'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/utils'

type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>

export function Avatar({ className, ...props }: AvatarProps) {
  return <AvatarPrimitive.Root className={cn('ui-avatar', className)} {...props} />
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <AvatarPrimitive.Image className={cn('ui-avatar-image', className)} {...props} />
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn('ui-avatar-fallback', className)}
      {...props}
    />
  )
}
