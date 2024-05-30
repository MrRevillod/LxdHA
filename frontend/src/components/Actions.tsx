
interface ActionIconProps {
    variant: ActionIconVariant,
    onClick: () => void
}

type ActionIconVariant =
    "edit" | "email" | "play" |
    "info" | "delete" | "reply" |
    "stop" | "reboot" | "settings"

export const ActionIcon = ({ variant, onClick }: ActionIconProps) => {

    const colors = {
        "blue": "text-primary",
        "red": "text-red-600",
        "green": "text-green-600",
        "neutral": "text-neutral-600"
    }

    const icons: { [key: string]: string } = {
        "info": `info-circle-fill ${colors.blue}`,
        "delete": `trash3-fill ${colors.red}`,
        "edit": `pencil-square ${colors.green}`,
        "email": `envelope-fill ${colors.neutral}`,
        "play": `play-fill ${colors.green}`,
        "stop": `stop-fill ${colors.red}`,
        "reboot": `arrow-clockwise ${colors.blue}`,
        "settings": `gear-wide-connected ${colors.neutral}`,
        "reply": `envelope-at-fill ${colors.green}`
    }

    const titles: { [key: string]: string } = {
        "info": "Details",
        "delete": "Delete",
        "edit": "Edit",
        "email": "Send email",
        "play": "Start instance",
        "stop": "Stop instance",
        "reboot": "Reboot instance",
        "settings": "Settings"
    }

    return <i className={`text-2xl bi bi-${icons[variant]}`} onClick={onClick} title={titles[variant]}></i>
}