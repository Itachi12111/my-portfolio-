import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'

export default class Controller
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.resources = this.experience.resources

        this.setLogic()
        this.setProjectControls()
        this.setMenuControls()
        this.setAboutMeControls()
        this.setScreenControls()
        this.setCamControls()

        this.resources.on('ready', () =>
        {
            this.ramenShop = this.experience.world.ramenShop
            this.materials = this.experience.materials
        })
    }

    setLogic()
    {
        this.logic = {}
        this.logic.buttonsLocked = false
        this.logic.mode = 'menu'

        this.logic.lockButtons = async (lockDuration) =>
        {
            this.logic.buttonsLocked = true
            await this.sleep(lockDuration)
            this.logic.buttonsLocked = false
        }
    }

    setProjectControls()
    {
        this.projectControls = {}
        this.projectControls.project1 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects1'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project1Texture
            }
            console.log('project1')
        }
        this.projectControls.project2 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects2'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project2Texture
            }
            console.log('project2')
        }
        this.projectControls.project3 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects3'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project3Texture
            }
            console.log('project3')
        }
        this.projectControls.project4 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects4'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project4Texture
            }
            console.log('project4')
        }
        this.projectControls.project5 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects5'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project5Texture
            }
            console.log('project5')
        }
        this.projectControls.project6 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects6'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project6Texture
            }
            console.log('project6')
        }
        this.projectControls.project7 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects7'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project7Texture
            }
            console.log('project7')
        }
        this.projectControls.project8 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects8'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.project8Texture
            }
            console.log('project8')
        }

        // Go back
        this.projectControls.projectBack = async () =>
        {
            if(this.logic.buttonsLocked === false && (this.logic.mode === 'projects0'))
            {
                this.logic.lockButtons(1500)
                this.logic.mode = 'menu'
                this.camControls.toDefault()
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.vendingMachineDefaultTexture
            }

            if(this.logic.buttonsLocked === false && (this.logic.mode === 'projects1' || this.logic.mode === 'projects2' || this.logic.mode === 'projects3'|| this.logic.mode === 'projects4'|| this.logic.mode === 'projects5'|| this.logic.mode === 'projects6'|| this.logic.mode === 'projects7'|| this.logic.mode === 'projects8'))
            {
                this.logic.mode = 'projects0'
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.vendingMachineMenuTexture
            }
            console.log('projectBack')
        }

        // Enter
        this.projectControls.projectEnter = async () =>
        {
            console.log('projectEnter')
        }
    }

    setMenuControls()
    {
        this.menuControls = {}
        this.menuControls.projects = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.logic.mode = 'projects0'
                this.menuControls.buttonIndicator(obj, color)
                this.camControls.toProjects()
     
                this.materials.vendingMachineScreenMaterial.map = this.resources.items.vendingMachineMenuTexture
                
            }
 
        }
        this.menuControls.jZhou = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.menuControls.buttonIndicator(obj, color)
                this.camera.transitions.jZhou(1.5)
            }
        }
        this.menuControls.articles = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.menuControls.buttonIndicator(obj, color)
                await this.sleep(250)
                window.open('https://medium.com/@jesse-zhou', '_blank');
            }
        }
        this.menuControls.aboutMe = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.logic.mode = 'aboutMe'
                this.menuControls.buttonIndicator(obj, color)
                this.camControls.toAboutMe()

                this.materials.bigScreenMaterial.map = this.resources.items.bigScreenAboutMeTexture
            }
        }
        this.menuControls.credits = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.logic.mode = 'creditsStart'
                this.menuControls.buttonIndicator(obj, color)
                this.camControls.toCredits()
            }
        }

        this.menuControls.buttonIndicator = async (obj, color) =>
        {
            if (color === 'black') {
                obj.material = this.ramenShop.materials.whiteSignMaterial
                await this.sleep(200)
                obj.material = this.ramenShop.materials.blackSignMaterial
            }
            if (color === 'white') {
                obj.material = this.ramenShop.materials.blackSignMaterial
                await this.sleep(200)
                obj.material = this.ramenShop.materials.whiteSignMaterial
            }
        }
    }

    setAboutMeControls()
    {
        this.aboutMeControls = {}

        this.aboutMeControls.aboutMeScreens = async () =>
        {
            if(this.logic.buttonsLocked === false && (this.logic.mode === 'skills' || this.logic.mode === 'experience'))
            {
                this.logic.mode = 'aboutMe'

                this.materials.bigScreenMaterial.map = this.resources.items.bigScreenAboutMeTexture
            }
        }

        this.aboutMeControls.aboutMeSkills = async () =>
        {
            if(this.logic.buttonsLocked === false && (this.logic.mode === 'aboutMe' || this.logic.mode === 'experience'))
            {
                this.logic.mode = 'skills'

                this.materials.bigScreenMaterial.map = this.resources.items.bigScreenSkillsTexture
            }
        }

        this.aboutMeControls.aboutMeExperience = async () =>
        {
            if(this.logic.buttonsLocked === false && (this.logic.mode === 'aboutMe' || this.logic.mode === 'skills'))
            {
                this.logic.mode = 'experience'

                this.materials.bigScreenMaterial.map = this.resources.items.bigScreenExperienceTexture
            }
        }

        this.aboutMeControls.aboutMeBack = async () =>
        {
            if(this.logic.buttonsLocked === false && (this.logic.mode === 'aboutMe' || this.logic.mode === 'skills' || this.logic.mode === 'experience'))
            {
                this.logic.lockButtons(1500)
                this.logic.mode = 'menu'
                this.camControls.toDefault()

                this.materials.bigScreenMaterial.map = this.resources.items.bigScreenDefaultTexture
            }
        }
    }

    setScreenControls()
    {
        this.screenControls = {}
        this.screenControls.arcadeScreen = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'creditsStart' )
            {
                this.logic.mode = 'credits'
                this.materials.arcadeScreenMaterial.map = this.resources.items.arcadeScreenCreditsTexture
            }
            else if(this.logic.buttonsLocked === false && this.logic.mode === 'credits' )
            {
                this.logic.mode = 'thanks'
                this.materials.arcadeScreenMaterial.map = this.resources.items.arcadeScreenThanksTexture
            }
            else if(this.logic.buttonsLocked === false && this.logic.mode === 'thanks' )
            {
                this.logic.lockButtons(1500)
                this.logic.mode = 'menu'
                this.camControls.toDefault()
                this.materials.arcadeScreenMaterial.map = this.resources.items.arcadeScreenDefaultTexture
            }
        }

    }

    setCamControls()
    {
        this.camControls = {}
        this.camControls.toProjects = async () =>
        {
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.vendingMachine(1.5)
            await this.sleep(1500)
            this.camera.camAngle.vendingMachine()
        }
        this.camControls.toDefault = async () =>
        {
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.default(1.5)
            await this.sleep(1500)
            this.camera.camAngle.default()
        }
        this.camControls.toAboutMe = async () =>
        {
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.aboutMe(1.5)
            await this.sleep(1500)
            this.camera.camAngle.aboutMe()
        }
        this.camControls.toCredits = async () =>
        {
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.credits(1.5)
            await this.sleep(1500)
            this.camera.camAngle.aboutMe()
        }
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}