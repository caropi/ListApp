import React from 'react';

export default class InfoSideBar extends React.Component {
    render () {
        const skincareSteps = [
            {
                "description": "Considered a chemical exfoliant, this could consist of AHA(Alpha Hydroxy Acid) or BHA (Beta Hydroxy Acid). You don't have to do this every day if you have sensitive skin. Chemical exfoliants will get rid of a lot of dead skin cells without needing to resort to harsh scrubs.",
                "id": "actives",
                "img": "./assets/actives.svg",
                "name": "Actives",
                "value": 5,
                "waitTime": "20-30 minutes"
            },
            {
                "description": "A staple of the standard 3-step routine is also essential to a routine of any size. Moistuizers come in many forms—from an emulsion, lotion, gel, or cream. They work to seal in moisture to plump up skin. Should be used in the morning and night.",
                "id": "cream",
                "img": "./assets/cream.svg",
                "name": "Cream",
                "value": 9,
                "waitTime": "2-3 minutes"
            },
            {
                "description": "To be applied by thinnest to thickest consistency. This is where your skin gets very concentrated treatments to fight specific needs (i.e. pores, acne, hydration). Gently tap your face to apply products.",
                "id": "essenceSerumAmpoule",
                "img": "./assets/essence-serum-ampoule.svg",
                "name": "Essence / Serum / Ampoule",
                "value": 7,
                "waitTime": "2-3 minutes"
            },
            {
                "description": "Before you pile makeup on under eyes, make sure you're actually fixing the problem underneath the makeup. Some use oils and others use creams to brighten and hydrate the skin underneath the eyes. Some have sensitive skin around the eyes and require this step more than others. ",
                "id": "eyeCream",
                "img": "./assets/eye-cream.svg",
                "name": "Eye Cream",
                "value": 10,
                "waitTime": "1-2 minutes"
            },
            {
                "description": "Either wash off or sheet mask. These come in different varieties depending on your needs (hydrating, skin polishing, brightening, etc). Pro-tip: If you're using a sheet mask, keep the packet with leftover essence to use on the rest of your body.",
                "id": "mask",
                "img": "./assets/mask.svg",
                "name": "Mask",
                "value": 12,
                "waitTime": "15-30 minutes (depending on mask)"
            },
            {
                "description": "The backbone of many natural skincare routines. It seems counter intuitive to put oil on oily skin but don't underestimate their efficacy. Some oils compositions ape and imitate the skins natural oils which can halt overproduction of oil on your skin due to dryness. Many other oils have properties that can aid in scar healing and dark spots.",
                "id": "oil",
                "img": "assets/oil.svg",
                "name": "Oil",
                "value": 8,
                "waitTime": "5 minutes (or until dry)"
            },
            {
                "description": "Essential if you spend your day wearing makeup or heavy sun block that just doesn't come off. Yes, the sun block has to come off too at the end of the day! A good way to check if your cleanser is actually removing sun block is to put some sun block on the back of your hand and drop some water on it, if it pearls it means the sun block is still knocking about. Oil cleansing is perfect for all skin types and should minimize any dryness or irritation.",
                "id": "oilCleanser",
                "img": "./assets/oil-cleanser.svg",
                "name": "Oil Cleanser",
                "value": 1,
                "waitTime": "None, go nuts!"
            },
            {
                "description": "Certain products that reduce scarring, cystic acne, skin discolourations need to be prescribed by a doctor in order to ensure that you're using potent enough products on your skin. Some examples of this include retinoids/tretinoin, azelaic acid, and clindamycin. Depending on where you live, these items may be available without prescription. Make sure to ask your doctor what the recommended application is as overapplication can result in skin irritation.",
                "id": "prescriptions",
                "img": "./assets/prescriptions.svg",
                "name": "Prescriptions",
                "value": 6,
                "waitTime": "5-20 minutes (longer if you need to let the prescription do its work)"
            },
            {
                "description": "Can be used as only cleanse if you don't need to remove much. This step clears any extra makeup/sun block residue or oil cleanser. If your skin is extra sensitive or you're using actives remember, the lower the pH of your cleanser, the better!",
                "id": "secondCleanser",
                "img": "./assets/foaming-cleanser.svg",
                "name": "Second Cleanser",
                "value": 2,
                "waitTime": "0 if you have a pH balanced cleanser or toner. Otherwise just wait 5-6 minutes"
            },
            {
                "description": "This is an optional step that is better suited to colder climates where the skin can get drier. Sleeping packs seal in all of your prior steps and is left on overnight. In the morning make sure to wash it off as they're not meant to be work during the day.",
                "id": "sleepingPack",
                "img": "./assets/sleeping-pack.svg",
                "name": "Sleeping Pack",
                "value": 11,
                "waitTime": "Leave that puppy on overnight! She's working."
            },
            {
                "description": "No matter where what the season or weather, the sun is a tenacious death ray and you need to protect yourself from it. This is even more vital if you're using prescriptions or active ingredients in your skincare routine which will make your skin photo sensitive. It doesn't matter if your moisturizer or makeup says it has spf-15, it's useless. You need a dedicated sun block to actually protect your skin. If you want your makeup or moisturizer to work as a sun block be prepared to throw buckets of it on your face.",
                "id": "sunBlock",
                "img": "./assets/sun-block.svg",
                "name": "Sun Block",
                "value": 13,
                "waitTime": "None! Go outside and live your life"
            },
            {
                "description": "Toners really function well at balancing the skin's pH so it's ready for active ingredients. They vary from super hydrating to slightly tingly. One major takeaway: if it's burning you, you have every right to burn it in a ceremonial fire and never speak of it again.",
                "id": "toner",
                "img": "./assets/toner.svg",
                "name": "Toner",
                "value": 3,
                "waitTime": "Depends on Consistency and how long it takes to dry"
            }
        ];
        return (
            <div className="infoSidebar">
                <ol>
                    <li>
                        <h3>{skincareSteps.name}</h3>
                        <div className="description">
                            <img src={skincareSteps.img} alt={skincareSteps.alt} />
                            <div className="text-container">
                                <p>
                                    {skincareSteps.description}
                                </p>
                                <i className="fas fa-stopwatch" /><strong> Time to wait before moving to next step:</strong> {skincareSteps.waitTime}
                                <p/>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        )
    }
}