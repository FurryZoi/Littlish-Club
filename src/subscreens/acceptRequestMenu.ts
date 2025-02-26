import { modStorage, syncStorage } from "@/modules/storage";
import { BaseSubscreen } from "./baseSubscreen";
import { MainMenu } from "./mainMenu";

export class AcceptRequestMenu extends BaseSubscreen {
    get name() {
        return "Request to become your mommy";
    }

    load() {
        this.createText({
            text: this.name,
            x: 100,
            y: 60,
            fontSize: 10
        });

        this.createText({
            text: `${modStorage.requestReciviedFrom.name} (${modStorage.requestReciviedFrom.id}) wants to become your mommy :3`,
            x: 200,
            y: 240,
            width: 1600,
            fontSize: 6
        }).style.textAlign = "center";

        const acceptBtn = this.createButton({
            text: "Accept",
            x: 550,
            y: 800,
            width: 400,
            padding: 2
        });
        acceptBtn.addEventListener("click", () => {
            modStorage.mommy = {
                name: modStorage.requestReciviedFrom.name,
                id: modStorage.requestReciviedFrom.id
            }
            delete modStorage.requestReciviedFrom;
            this.exit();
        });

        const rejectBtn = this.createButton({
            text: "Reject",
            x: 1050,
            y: 800,
            width: 400,
            padding: 2
        });
        rejectBtn.addEventListener("click", () => {
            delete modStorage.requestReciviedFrom;
            this.exit();
        });
    }

    exit() {
        syncStorage();
        this.setSubscreen(new MainMenu());
    }
}