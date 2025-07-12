import { modStorage, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "zois-core/ui";
import { MainMenu } from "./mainMenu";

export class AcceptRequestMenu extends BaseSubscreen {
    get name() {
        return "Request to become your mommy";
    }

    load() {
        super.load();

        this.createText({
            text: `${modStorage.requestReciviedFrom.name} (${modStorage.requestReciviedFrom.id}) wants to become your mommy :3`,
            x: 200,
            y: 240,
            width: 1600,
            fontSize: 6
        }).style.textAlign = "center";

        this.createButton({
            text: "Accept",
            x: 550,
            y: 800,
            width: 400,
            padding: 2,
            onClick: () => {
                modStorage.mommy = {
                    name: modStorage.requestReciviedFrom.name,
                    id: modStorage.requestReciviedFrom.id
                }
                delete modStorage.requestReciviedFrom;
                this.exit();
            }
        });

        this.createButton({
            text: "Reject",
            x: 1050,
            y: 800,
            width: 400,
            padding: 2,
            onClick: () => {
                delete modStorage.requestReciviedFrom;
                this.exit();
            }
        });
    }

    exit() {
        super.exit();
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}