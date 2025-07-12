import { BaseSubscreen } from "zois-core/ui";
import { MainMenu } from "./mainMenu";
import { messagesManager } from "zois-core/messaging";
import { waitFor } from "zois-core";
import { toastsManager } from "zois-core/popups";
import { hookFunction, HookPriority } from "zois-core/modsApi";


export class SummoningRattleMenu extends BaseSubscreen {
    private onlineFriendsList: ServerFriendInfo[] = [];

    get name() {
        return "Summoning Rattle (BETA)";
    }

    async load() {
        super.load();

        this.createText({
            withBackground: true,
            text: `You can summon your babies with a rattle. It attracts attention perfectly and is audible through the rooms :3 Keep in mind that summoning will only work if the target character has "Summoning rattle" rule active.`,
            width: 1600,
            x: 200,
            y: 200,
            padding: 1
        });

        let isLoading = true;
        const removeHook = hookFunction("ServerAccountQueryResult", HookPriority.OBSERVE, (args, next) => {
            const [data] = args as [ServerAccountQueryResponse];
            if (data.Query === "OnlineFriends") {
                this.onlineFriendsList = data.Result;
                isLoading = false;
                removeHook();
            }
            return next(args);
        });

        const loadingText = this.createText({
            text: "Loading...",
            x: 500,
            y: 550,
            width: 1000,
            fontSize: 8
        });
        loadingText.style.textAlign = "center";

        ServerSend("AccountQuery", { Query: "OnlineFriends" });
        await waitFor(() => !isLoading);
        loadingText.remove();

        if (this.onlineFriendsList.length === 0) {
            return this.createText({
                text: "No friends online :c",
                x: 500,
                y: 550,
                width: 1000,
                fontSize: 8
            }).style.textAlign = "center";
        }

        const scrollView = this.createScrollView({
            scroll: "y",
            x: 200,
            y: 400,
            width: 1600,
            height: 510
        });

        this.onlineFriendsList.toSorted().forEach((f) => {
            const line = document.createElement("div");
            line.style.cssText = "display: flex; align-items: center; justify-content: space-between; column-gap: 1vw; width: 100%; margin-top: 1vw;";
            line.append(
                this.createText({
                    text: `<b>${f.MemberName} (${f.MemberNumber})</b>`,
                    place: false
                }),
                this.createButton({
                    text: "Summon",
                    padding: 1,
                    place: false,
                    onClick: async () => {
                        const spinnerId = toastsManager.spinner({
                            message: "Shaking the rattle..."
                        });
                        const res = await messagesManager.sendRequest<{
                            success?: true
                        }>({
                            message: "summon",
                            data: {
                                roomName: ChatRoomData.Name
                            },
                            target: f.MemberNumber,
                            type: "beep"
                        });
                        toastsManager.removeSpinner(spinnerId);

                        if (res.isError) {
                            return toastsManager.error({
                                title: "Summon error",
                                message: `No response was received. Make sure ${f.MemberName} has "Summoning rattle" rule active.`,
                                duration: 6000
                            });
                        }

                        if (res.data?.success) {
                            toastsManager.success({
                                message: "Summon was completed successfully",
                                duration: 4000
                            });
                        }
                    }
                })
            );
            scrollView.append(line);
        });
    }

    exit(): void {
        super.exit();
        this.setSubscreen(new MainMenu());
    }
}