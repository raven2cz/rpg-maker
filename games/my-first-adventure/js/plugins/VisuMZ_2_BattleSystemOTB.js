//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
 * 
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 * 
 * ---
 * 
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 * ---
 * 
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.18: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where adding states with Action Times+ would add too many
 *    actions. Fix made by Olivia.
 * 
 * Version 1.17: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the <OTB Target Follow Turn: +x> and similar notetags
 *    altered the following turn regardless of the presence of the target in 
 *    current turn order. Fix made by Olivia.
 * 
 * Version 1.16: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Auto Skill Triggers. Update by Arisu.
 * 
 * Version 1.15: May 16, 2024
 * * Feature Update!
 * ** Direct removal of stun states will restore actions for battlers for
 *    current turns and follow up turns. Update made by Olivia.
 * 
 * Version 1.14: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused turn order glitches with Action Times+ that
 *    aren't at 100% value. Fix made by Olivia.
 * ** Fixed a bug that caused added Action Times+ to not trigger on actors that
 *    have already exhausted their current turns if raised due to a state.
 *    Fix made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the Forced Action of a battler is not used properly.
 *    Fix made by Arisu.
 * 
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x205e7a=_0x4fd4;(function(_0x172238,_0x2bb663){const _0x2b1538=_0x4fd4,_0x4c32b6=_0x172238();while(!![]){try{const _0x54c8c7=parseInt(_0x2b1538(0x17c))/0x1*(-parseInt(_0x2b1538(0x1ad))/0x2)+-parseInt(_0x2b1538(0x255))/0x3+parseInt(_0x2b1538(0x104))/0x4+parseInt(_0x2b1538(0x26a))/0x5*(-parseInt(_0x2b1538(0x2c8))/0x6)+parseInt(_0x2b1538(0x185))/0x7+-parseInt(_0x2b1538(0x127))/0x8+-parseInt(_0x2b1538(0x1bb))/0x9*(-parseInt(_0x2b1538(0x1f8))/0xa);if(_0x54c8c7===_0x2bb663)break;else _0x4c32b6['push'](_0x4c32b6['shift']());}catch(_0x2c7263){_0x4c32b6['push'](_0x4c32b6['shift']());}}}(_0x150e,0xa8473));var label=_0x205e7a(0x10e),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine','VisuMZ_1_BattleCore'],pluginData=$plugins['filter'](function(_0x43570b){const _0x536245=_0x205e7a;return _0x43570b[_0x536245(0x1f2)]&&_0x43570b[_0x536245(0x288)][_0x536245(0x221)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x205e7a(0x18b)]||{},VisuMZ['ConvertParams']=function(_0x382609,_0x46dc46){const _0x527b6d=_0x205e7a;for(const _0x7206a6 in _0x46dc46){if(_0x7206a6['match'](/(.*):(.*)/i)){const _0x32e566=String(RegExp['$1']),_0x1c238e=String(RegExp['$2'])[_0x527b6d(0x158)]()[_0x527b6d(0x262)]();let _0x1c4d95,_0x58fa29,_0x15b427;switch(_0x1c238e){case _0x527b6d(0x129):_0x1c4d95=_0x46dc46[_0x7206a6]!==''?Number(_0x46dc46[_0x7206a6]):0x0;break;case _0x527b6d(0x256):_0x58fa29=_0x46dc46[_0x7206a6]!==''?JSON[_0x527b6d(0x27b)](_0x46dc46[_0x7206a6]):[],_0x1c4d95=_0x58fa29[_0x527b6d(0x131)](_0x5402fa=>Number(_0x5402fa));break;case _0x527b6d(0x22c):_0x1c4d95=_0x46dc46[_0x7206a6]!==''?eval(_0x46dc46[_0x7206a6]):null;break;case _0x527b6d(0x1c9):_0x58fa29=_0x46dc46[_0x7206a6]!==''?JSON[_0x527b6d(0x27b)](_0x46dc46[_0x7206a6]):[],_0x1c4d95=_0x58fa29[_0x527b6d(0x131)](_0x3e056f=>eval(_0x3e056f));break;case _0x527b6d(0x334):_0x1c4d95=_0x46dc46[_0x7206a6]!==''?JSON[_0x527b6d(0x27b)](_0x46dc46[_0x7206a6]):'';break;case'ARRAYJSON':_0x58fa29=_0x46dc46[_0x7206a6]!==''?JSON[_0x527b6d(0x27b)](_0x46dc46[_0x7206a6]):[],_0x1c4d95=_0x58fa29[_0x527b6d(0x131)](_0x5d7190=>JSON[_0x527b6d(0x27b)](_0x5d7190));break;case _0x527b6d(0x1cb):_0x1c4d95=_0x46dc46[_0x7206a6]!==''?new Function(JSON[_0x527b6d(0x27b)](_0x46dc46[_0x7206a6])):new Function(_0x527b6d(0x302));break;case _0x527b6d(0x2ad):_0x58fa29=_0x46dc46[_0x7206a6]!==''?JSON['parse'](_0x46dc46[_0x7206a6]):[],_0x1c4d95=_0x58fa29[_0x527b6d(0x131)](_0x1e98b2=>new Function(JSON[_0x527b6d(0x27b)](_0x1e98b2)));break;case'STR':_0x1c4d95=_0x46dc46[_0x7206a6]!==''?String(_0x46dc46[_0x7206a6]):'';break;case _0x527b6d(0x16d):_0x58fa29=_0x46dc46[_0x7206a6]!==''?JSON[_0x527b6d(0x27b)](_0x46dc46[_0x7206a6]):[],_0x1c4d95=_0x58fa29[_0x527b6d(0x131)](_0x52ff7=>String(_0x52ff7));break;case _0x527b6d(0x164):_0x15b427=_0x46dc46[_0x7206a6]!==''?JSON['parse'](_0x46dc46[_0x7206a6]):{},_0x1c4d95=VisuMZ[_0x527b6d(0x187)]({},_0x15b427);break;case _0x527b6d(0x2e9):_0x58fa29=_0x46dc46[_0x7206a6]!==''?JSON['parse'](_0x46dc46[_0x7206a6]):[],_0x1c4d95=_0x58fa29[_0x527b6d(0x131)](_0x24f3ab=>VisuMZ[_0x527b6d(0x187)]({},JSON[_0x527b6d(0x27b)](_0x24f3ab)));break;default:continue;}_0x382609[_0x32e566]=_0x1c4d95;}}return _0x382609;},(_0x1406f1=>{const _0xf24009=_0x205e7a,_0x312946=_0x1406f1[_0xf24009(0x1f9)];for(const _0x152908 of dependencies){if(!Imported[_0x152908]){alert(_0xf24009(0x1d1)['format'](_0x312946,_0x152908)),SceneManager['exit']();break;}}const _0x47a134=_0x1406f1[_0xf24009(0x288)];if(_0x47a134[_0xf24009(0x2b6)](/\[Version[ ](.*?)\]/i)){const _0x3dc0aa=Number(RegExp['$1']);_0x3dc0aa!==VisuMZ[label][_0xf24009(0x309)]&&(alert(_0xf24009(0x192)['format'](_0x312946,_0x3dc0aa)),SceneManager[_0xf24009(0x136)]());}if(_0x47a134[_0xf24009(0x2b6)](/\[Tier[ ](\d+)\]/i)){const _0x46fe11=Number(RegExp['$1']);_0x46fe11<tier?(alert(_0xf24009(0x294)[_0xf24009(0x2f6)](_0x312946,_0x46fe11,tier)),SceneManager[_0xf24009(0x136)]()):tier=Math[_0xf24009(0x1fa)](_0x46fe11,tier);}VisuMZ[_0xf24009(0x187)](VisuMZ[label][_0xf24009(0x18b)],_0x1406f1[_0xf24009(0x1dc)]);})(pluginData),PluginManager[_0x205e7a(0x247)](pluginData[_0x205e7a(0x1f9)],_0x205e7a(0x1b9),_0x1fadbc=>{const _0x13ac65=_0x205e7a;VisuMZ[_0x13ac65(0x187)](_0x1fadbc,_0x1fadbc);const _0x34bd7e=_0x1fadbc[_0x13ac65(0x2ac)],_0x35cf63=_0x1fadbc['IconIndex'];for(const _0x4f193d of _0x34bd7e){const _0x940003=$gameActors['actor'](_0x4f193d);if(!_0x940003)continue;_0x940003[_0x13ac65(0x320)]='icon',_0x940003[_0x13ac65(0x280)]=_0x35cf63;}}),PluginManager[_0x205e7a(0x247)](pluginData[_0x205e7a(0x1f9)],'OtbTurnOrderActorFace',_0x134b92=>{const _0x557c0a=_0x205e7a;VisuMZ[_0x557c0a(0x187)](_0x134b92,_0x134b92);const _0x5c916e=_0x134b92[_0x557c0a(0x2ac)],_0x5b9820=_0x134b92['FaceName'],_0x11e378=_0x134b92['FaceIndex'];for(const _0xfdcd3d of _0x5c916e){const _0x1977da=$gameActors[_0x557c0a(0x2fc)](_0xfdcd3d);if(!_0x1977da)continue;_0x1977da[_0x557c0a(0x320)]=_0x557c0a(0x1e8),_0x1977da['_otbTurnOrderFaceName']=_0x5b9820,_0x1977da[_0x557c0a(0x229)]=_0x11e378;}}),PluginManager['registerCommand'](pluginData[_0x205e7a(0x1f9)],_0x205e7a(0x1ac),_0x4a728e=>{const _0x2845c8=_0x205e7a;VisuMZ[_0x2845c8(0x187)](_0x4a728e,_0x4a728e);const _0xa5dc9d=_0x4a728e[_0x2845c8(0x2ac)];for(const _0xa082d3 of _0xa5dc9d){const _0x1c5f36=$gameActors['actor'](_0xa082d3);if(!_0x1c5f36)continue;_0x1c5f36[_0x2845c8(0x111)]();}}),PluginManager[_0x205e7a(0x247)](pluginData[_0x205e7a(0x1f9)],_0x205e7a(0x265),_0x53771c=>{const _0x1d6ed7=_0x205e7a;VisuMZ['ConvertParams'](_0x53771c,_0x53771c);const _0x5b7bda=_0x53771c[_0x1d6ed7(0x323)],_0x152cae=_0x53771c[_0x1d6ed7(0x263)];for(const _0x3ddec3 of _0x5b7bda){const _0x3b38ff=$gameTroop[_0x1d6ed7(0x28d)]()[_0x3ddec3];if(!_0x3b38ff)continue;_0x3b38ff[_0x1d6ed7(0x320)]=_0x1d6ed7(0x327),_0x3b38ff[_0x1d6ed7(0x280)]=_0x152cae;}}),PluginManager[_0x205e7a(0x247)](pluginData[_0x205e7a(0x1f9)],_0x205e7a(0x1ef),_0x5de941=>{const _0x14f668=_0x205e7a;VisuMZ['ConvertParams'](_0x5de941,_0x5de941);const _0x28529f=_0x5de941[_0x14f668(0x323)],_0x241f87=_0x5de941[_0x14f668(0x301)],_0x2edb38=_0x5de941[_0x14f668(0x2cd)];for(const _0x9bf0b3 of _0x28529f){const _0x4d2095=$gameTroop[_0x14f668(0x28d)]()[_0x9bf0b3];if(!_0x4d2095)continue;_0x4d2095[_0x14f668(0x320)]=_0x14f668(0x1e8),_0x4d2095[_0x14f668(0x174)]=_0x241f87,_0x4d2095[_0x14f668(0x229)]=_0x2edb38;}}),PluginManager[_0x205e7a(0x247)](pluginData[_0x205e7a(0x1f9)],_0x205e7a(0x2c0),_0x141a53=>{const _0x44d896=_0x205e7a;VisuMZ[_0x44d896(0x187)](_0x141a53,_0x141a53);const _0x334f17=_0x141a53[_0x44d896(0x323)];for(const _0xd52645 of _0x334f17){const _0x5083e7=$gameTroop[_0x44d896(0x28d)]()[_0xd52645];if(!_0x5083e7)continue;_0x5083e7[_0x44d896(0x111)]();}}),PluginManager[_0x205e7a(0x247)](pluginData[_0x205e7a(0x1f9)],_0x205e7a(0x115),_0x3c51c0=>{const _0x5ef807=_0x205e7a;VisuMZ[_0x5ef807(0x187)](_0x3c51c0,_0x3c51c0);const _0x9c51cb=_0x3c51c0['Visible'];$gameSystem['setBattleSystemOTBTurnOrderVisible'](_0x9c51cb);}),VisuMZ['BattleSystemOTB'][_0x205e7a(0x12d)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager[_0x205e7a(0x22d)]=function(_0x1068e7){const _0x3fd1e7=_0x205e7a;_0x1068e7=_0x1068e7[_0x3fd1e7(0x158)]()[_0x3fd1e7(0x262)](),this['_stateIDs']=this[_0x3fd1e7(0x23b)]||{};if(this['_stateIDs'][_0x1068e7])return this['_stateIDs'][_0x1068e7];for(const _0x2e6b66 of $dataStates){if(!_0x2e6b66)continue;this['_stateIDs'][_0x2e6b66[_0x3fd1e7(0x1f9)][_0x3fd1e7(0x158)]()[_0x3fd1e7(0x262)]()]=_0x2e6b66['id'];}return this['_stateIDs'][_0x1068e7]||0x0;},ImageManager[_0x205e7a(0x19a)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x205e7a(0x141)]=ImageManager[_0x205e7a(0x141)]||0x6,SceneManager[_0x205e7a(0x26d)]=function(){const _0x21c612=_0x205e7a;return this['_scene']&&this[_0x21c612(0x26e)][_0x21c612(0x2e2)]===Scene_Battle;},VisuMZ[_0x205e7a(0x10e)]['BattleManager_setup']=BattleManager[_0x205e7a(0x317)],BattleManager[_0x205e7a(0x317)]=function(_0x50f52a,_0x303286,_0x1333b6){const _0x3b938b=_0x205e7a;VisuMZ['BattleSystemOTB'][_0x3b938b(0x328)][_0x3b938b(0x1e2)](this,_0x50f52a,_0x303286,_0x1333b6),this[_0x3b938b(0x2db)]();},BattleManager[_0x205e7a(0x2db)]=function(){const _0x3701e0=_0x205e7a;if(!this[_0x3701e0(0x31e)]())return;this[_0x3701e0(0x1d0)]=[],this['_otb_createdFirstTurnOrders']=![];},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x21d)]=BattleManager[_0x205e7a(0x1fe)],BattleManager['battleSys']=function(){const _0x4a0e89=_0x205e7a;if(this[_0x4a0e89(0x31e)]())return _0x4a0e89(0x293);return VisuMZ[_0x4a0e89(0x10e)][_0x4a0e89(0x21d)][_0x4a0e89(0x1e2)](this);},BattleManager[_0x205e7a(0x31e)]=function(){const _0x378457=_0x205e7a;return $gameSystem[_0x378457(0x2a0)]()==='OTB';},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x107)]=BattleManager[_0x205e7a(0x267)],BattleManager[_0x205e7a(0x267)]=function(){const _0x1500c7=_0x205e7a;if(this[_0x1500c7(0x31e)]())return![];return VisuMZ['BattleSystemOTB'][_0x1500c7(0x107)][_0x1500c7(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x220)]=BattleManager[_0x205e7a(0x212)],BattleManager[_0x205e7a(0x212)]=function(){const _0x575f1f=_0x205e7a;if(this[_0x575f1f(0x31e)]())return![];return VisuMZ[_0x575f1f(0x10e)][_0x575f1f(0x220)][_0x575f1f(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)]['BattleManager_isTurnBased']=BattleManager[_0x205e7a(0x24e)],BattleManager[_0x205e7a(0x24e)]=function(){const _0x26043d=_0x205e7a;if(this[_0x26043d(0x31e)]())return!![];return VisuMZ[_0x26043d(0x10e)][_0x26043d(0x2f7)][_0x26043d(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x29c)]=BattleManager[_0x205e7a(0x335)],BattleManager[_0x205e7a(0x335)]=function(){const _0x4863e9=_0x205e7a;VisuMZ[_0x4863e9(0x10e)]['BattleManager_startInput'][_0x4863e9(0x1e2)](this),this[_0x4863e9(0x31e)]()&&$gameParty['canInput']()&&!this[_0x4863e9(0x140)]&&this[_0x4863e9(0x11b)]();},BattleManager[_0x205e7a(0x11b)]=function(){const _0x2c94ce=_0x205e7a;this[_0x2c94ce(0x2bb)]();},VisuMZ['BattleSystemOTB']['BattleManager_processTurn']=BattleManager[_0x205e7a(0x1aa)],BattleManager[_0x205e7a(0x1aa)]=function(){const _0x25a767=_0x205e7a;this[_0x25a767(0x31e)]()?this['processTurnOTB']():VisuMZ[_0x25a767(0x10e)][_0x25a767(0x194)][_0x25a767(0x1e2)](this);},BattleManager[_0x205e7a(0x180)]=function(){const _0xc09e7f=_0x205e7a,_0x19ad71=this[_0xc09e7f(0x30d)];if(_0x19ad71[_0xc09e7f(0x2b7)]()&&_0x19ad71[_0xc09e7f(0x234)]()){const _0x22948e=_0x19ad71[_0xc09e7f(0x205)]();if(!_0x22948e)VisuMZ['BattleSystemOTB'][_0xc09e7f(0x194)]['call'](this);else _0x22948e['_forceAction']?VisuMZ[_0xc09e7f(0x10e)][_0xc09e7f(0x194)][_0xc09e7f(0x1e2)](this):(this[_0xc09e7f(0x27e)]=_0x19ad71,this[_0xc09e7f(0x11a)]());}else VisuMZ['BattleSystemOTB']['BattleManager_processTurn'][_0xc09e7f(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1ff)]=BattleManager[_0x205e7a(0x2a3)],BattleManager[_0x205e7a(0x2a3)]=function(){const _0x4e9af5=_0x205e7a;this[_0x4e9af5(0x31e)]()?VisuMZ[_0x4e9af5(0x10e)]['BattleManager_processTurn']['call'](this):VisuMZ[_0x4e9af5(0x10e)][_0x4e9af5(0x1ff)][_0x4e9af5(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x223)]=BattleManager[_0x205e7a(0x261)],BattleManager[_0x205e7a(0x261)]=function(){const _0x441da6=_0x205e7a;this[_0x441da6(0x31e)]()?this[_0x441da6(0x283)]():VisuMZ[_0x441da6(0x10e)][_0x441da6(0x223)][_0x441da6(0x1e2)](this);},BattleManager[_0x205e7a(0x283)]=function(){const _0x343b0c=_0x205e7a;this[_0x343b0c(0x27e)]=null,this[_0x343b0c(0x238)]=![];},VisuMZ['BattleSystemOTB'][_0x205e7a(0x161)]=BattleManager[_0x205e7a(0x2d4)],BattleManager[_0x205e7a(0x2d4)]=function(){const _0x104147=_0x205e7a;this[_0x104147(0x1fc)](),VisuMZ[_0x104147(0x10e)][_0x104147(0x161)]['call'](this),this[_0x104147(0x13f)]();},BattleManager[_0x205e7a(0x1fc)]=function(){const _0x49e333=_0x205e7a;if(!this[_0x49e333(0x31e)]())return;this[_0x49e333(0x13c)]();this['_subject']&&this[_0x49e333(0x30d)][_0x49e333(0x289)]();if(this[_0x49e333(0x30d)]&&this['_subject'][_0x49e333(0x100)]()&&this['_actionBattlers'][_0x49e333(0x221)](this[_0x49e333(0x30d)])){const _0x243403=this[_0x49e333(0x30d)]['_actions']['filter'](_0x2ae9a9=>_0x2ae9a9[_0x49e333(0x1dd)]);this[_0x49e333(0x30d)][_0x49e333(0x298)]();if(_0x243403){let _0x25c29b=_0x243403[_0x49e333(0x20a)];while(_0x25c29b--){this[_0x49e333(0x30d)][_0x49e333(0x1ee)][_0x49e333(0x19c)]();}this[_0x49e333(0x30d)][_0x49e333(0x1ee)]=_0x243403['concat'](this['_subject'][_0x49e333(0x1ee)]);}}},BattleManager[_0x205e7a(0x13f)]=function(){const _0xc53656=_0x205e7a;if(!this[_0xc53656(0x31e)]())return;this[_0xc53656(0x13c)]();this[_0xc53656(0x30d)]&&(this[_0xc53656(0x18e)](this[_0xc53656(0x30d)]),this[_0xc53656(0x30d)]=null);this['_forcedBattlers'][_0xc53656(0x20a)]>0x0&&(this[_0xc53656(0x30d)]=this[_0xc53656(0x272)]());;},BattleManager[_0x205e7a(0x1e6)]=VisuMZ['BattleSystemOTB'][_0x205e7a(0x18b)][_0x205e7a(0x10f)][_0x205e7a(0x225)],BattleManager['OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER']=VisuMZ[_0x205e7a(0x10e)]['Settings'][_0x205e7a(0x10f)][_0x205e7a(0x133)],BattleManager['OTB_STUN_INFINITY_CLAMP']=VisuMZ['BattleSystemOTB'][_0x205e7a(0x18b)][_0x205e7a(0x10f)][_0x205e7a(0x186)],VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x21a)]=BattleManager[_0x205e7a(0x28a)],BattleManager['makeActionOrders']=function(){const _0x4bd46b=_0x205e7a;this[_0x4bd46b(0x31e)]()?this['makeActionOrdersOTB']():VisuMZ[_0x4bd46b(0x10e)][_0x4bd46b(0x21a)][_0x4bd46b(0x1e2)](this);},BattleManager[_0x205e7a(0x32f)]=function(){const _0x4dcee2=_0x205e7a;let _0x3b57fd=this[_0x4dcee2(0x23c)]?0x1:0x2;while(_0x3b57fd--){this[_0x4dcee2(0x1a2)]();}const _0x37e109=!this['_otb_createdFirstTurnOrders'];this['_otb_createdFirstTurnOrders']=!![];},BattleManager[_0x205e7a(0x1a2)]=function(){const _0x5d6909=_0x205e7a;this[_0x5d6909(0x1e7)]=this[_0x5d6909(0x1d0)],this['otbShiftNextTurnSpritesToCurrentTurn']();const _0x13d049=[];_0x13d049[_0x5d6909(0x178)](...$gameParty[_0x5d6909(0x1bc)]()),_0x13d049[_0x5d6909(0x178)](...$gameTroop[_0x5d6909(0x28d)]());for(const _0x1d211e of _0x13d049){_0x1d211e[_0x5d6909(0x2b1)]();}_0x13d049['sort']((_0x208336,_0x3c9f61)=>_0x3c9f61['speed']()-_0x208336['speed']()),this[_0x5d6909(0x1d0)]=_0x13d049,this[_0x5d6909(0x171)](),this['removeActionBattlersOTB'](),this[_0x5d6909(0x139)]();},BattleManager['otbApplyActionTimes']=function(){const _0x1781fd=_0x205e7a;if(!BattleManager['OTB_ADDED_ACTION_TIMES'])return;const _0x4dbe45=this[_0x1781fd(0x1d0)],_0x228213=this[_0x1781fd(0x101)]();for(const _0x579a51 of _0x228213){if(!_0x579a51)continue;if(!_0x579a51[_0x1781fd(0x2eb)]())continue;if(!_0x579a51[_0x1781fd(0x2c5)]())continue;if(!_0x4dbe45[_0x1781fd(0x221)](_0x579a51))continue;const _0x427489=_0x4dbe45[_0x1781fd(0x122)](_0x579a51);let _0x1d417f=_0x579a51[_0x1781fd(0x12e)]()-0x1;while(_0x1d417f--){let _0x41468c=_0x427489;BattleManager[_0x1781fd(0x175)]&&(_0x41468c=Math[_0x1781fd(0x337)](_0x4dbe45[_0x1781fd(0x20a)]-_0x427489)+_0x427489),_0x4dbe45[_0x1781fd(0x2de)](_0x41468c,0x0,_0x579a51);}}},BattleManager[_0x205e7a(0x13c)]=function(){const _0x432a99=_0x205e7a;if(!this[_0x432a99(0x31e)]())return;this['_actionBattlers']=this[_0x432a99(0x1e7)]||[],this[_0x432a99(0x1e7)][_0x432a99(0x2f0)](null),this[_0x432a99(0x1e7)]['remove'](undefined),this[_0x432a99(0x1e7)]=this[_0x432a99(0x1e7)][_0x432a99(0x13b)](_0x3f2be0=>_0x3f2be0[_0x432a99(0x264)]()),this[_0x432a99(0x1e7)]=this[_0x432a99(0x1e7)][_0x432a99(0x13b)](_0x3276f9=>VisuMZ[_0x432a99(0x10e)][_0x432a99(0x210)](_0x3276f9)),this[_0x432a99(0x140)]&&(this['_actionBattlers']=this['_actionBattlers'][_0x432a99(0x13b)](_0x1c6342=>!_0x1c6342['isActor']())),this['_preemptive']&&(this['_actionBattlers']=this[_0x432a99(0x1e7)][_0x432a99(0x13b)](_0x39513b=>!_0x39513b['isEnemy']())),this[_0x432a99(0x1d0)]=this['_otb_actionBattlersNext']||[],this['_otb_actionBattlersNext']['remove'](null),this[_0x432a99(0x1d0)][_0x432a99(0x2f0)](undefined),this['_otb_actionBattlersNext']=this['_otb_actionBattlersNext']['filter'](_0x231817=>_0x231817['isBattleMember']()),this[_0x432a99(0x1d0)]=this[_0x432a99(0x1d0)][_0x432a99(0x13b)](_0x383687=>VisuMZ[_0x432a99(0x10e)][_0x432a99(0x1d3)](_0x383687)),this['otbRemoveUnableTurnOrderSprites'](),this['refreshTurnOrder']();},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x210)]=function(_0xe532d0){const _0x2ff4d6=_0x205e7a;if(!_0xe532d0)return![];if(!_0xe532d0[_0x2ff4d6(0x2c5)]())return![];if(!_0xe532d0[_0x2ff4d6(0x2eb)]())return![];return _0xe532d0[_0x2ff4d6(0x100)]();},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1d3)]=function(_0x2423c6){const _0x37be84=_0x205e7a;if(!_0x2423c6)return![];const _0x4e4b5e=JsonEx[_0x37be84(0x297)](_0x2423c6);return _0x4e4b5e[_0x37be84(0x1bf)]=!![],_0x4e4b5e['_tempBattler']=!![],_0x4e4b5e[_0x37be84(0x12b)](),_0x4e4b5e[_0x37be84(0x27a)](0x1),_0x4e4b5e[_0x37be84(0x27a)](0x2),_0x4e4b5e[_0x37be84(0x117)](),VisuMZ[_0x37be84(0x10e)]['ActionBattlersFilter'](_0x4e4b5e);},BattleManager[_0x205e7a(0x1c3)]=function(_0x5e6495,_0x397925,_0x93d4d4){const _0x1af8eb=_0x205e7a;if(!_0x397925)return;const _0x7c5065=_0x93d4d4?this[_0x1af8eb(0x1d0)]:this[_0x1af8eb(0x1e7)];if(!_0x7c5065)return;if(!_0x7c5065[_0x1af8eb(0x221)](_0x5e6495))return;const _0xdacbde=VisuMZ[_0x1af8eb(0x10e)][_0x1af8eb(0x2e1)](_0x5e6495,_0x7c5065),_0x69bda=_0x93d4d4?VisuMZ[_0x1af8eb(0x10e)][_0x1af8eb(0x18f)](_0x7c5065):0x0,_0x348204=_0xdacbde[_0x1af8eb(0x20a)]-0x1;for(let _0x401a5d=_0x348204;_0x401a5d>=0x0;_0x401a5d--){_0x7c5065[_0x1af8eb(0x2de)](_0xdacbde[_0x401a5d],0x1);}for(var _0x3db7c7=0x0;_0x3db7c7<_0xdacbde[_0x1af8eb(0x20a)];_0x3db7c7++){var _0xfbc03c=(_0xdacbde[_0x3db7c7]-_0x397925)[_0x1af8eb(0x27f)](_0x69bda,_0x7c5065[_0x1af8eb(0x20a)]);_0x7c5065[_0x1af8eb(0x2de)](_0xfbc03c,0x0,_0x5e6495);}this[_0x1af8eb(0x13c)](),this[_0x1af8eb(0x105)]();},VisuMZ[_0x205e7a(0x10e)]['GetAllIndicies']=function(_0x597bb0,_0x31b665){const _0x389676=_0x205e7a,_0x18811e=[],_0x3057bf=_0x31b665[_0x389676(0x20a)];for(let _0x4e10b0=0x0;_0x4e10b0<_0x3057bf;_0x4e10b0++){if(_0x31b665[_0x4e10b0]===_0x597bb0)_0x18811e[_0x389676(0x178)](_0x4e10b0);}return _0x18811e;},VisuMZ['BattleSystemOTB']['getInfinityClamp']=function(_0x32d094){const _0x50e2a1=_0x205e7a;if(!BattleManager[_0x50e2a1(0x300)])return 0x0;if(!_0x32d094)return 0x0;let _0x22297f=0x0;const _0x47278b=_0x32d094['length'];for(let _0x102124=0x0;_0x102124<_0x47278b;_0x102124++){const _0x200d4d=_0x32d094[_0x102124];if(!_0x200d4d)continue;if(_0x200d4d[_0x50e2a1(0x112)]()!==Infinity)return _0x102124;else _0x22297f++;}return _0x22297f;},BattleManager['otbShiftNextTurnSpritesToCurrentTurn']=function(){const _0x40952d=_0x205e7a;if(!this['isOTB']())return;const _0x1daef8=SceneManager[_0x40952d(0x26e)]['_otbTurnOrderWindow'];if(!_0x1daef8)return;_0x1daef8[_0x40952d(0x2f4)]();},BattleManager['otbCreateNewTurnOrderSprites']=function(){const _0x2a5134=_0x205e7a;if(!this[_0x2a5134(0x31e)]())return;const _0x10b065=SceneManager[_0x2a5134(0x26e)]['_otbTurnOrderWindow'];if(!_0x10b065)return;_0x10b065[_0x2a5134(0x118)]();},VisuMZ['BattleSystemOTB']['BattleManager_getNextSubject']=BattleManager['getNextSubject'],BattleManager[_0x205e7a(0x272)]=function(){const _0x10f05c=_0x205e7a;return this['_subject']=VisuMZ[_0x10f05c(0x10e)]['BattleManager_getNextSubject'][_0x10f05c(0x1e2)](this),this['isOTB']()&&this[_0x10f05c(0x30d)]&&this['otbShiftTurnOrderForSubject'](this[_0x10f05c(0x30d)]),this[_0x10f05c(0x30d)];},BattleManager[_0x205e7a(0x12c)]=function(_0x39ba8f){const _0x574202=_0x205e7a;if(!this[_0x574202(0x31e)]())return;const _0x9c0acd=SceneManager[_0x574202(0x26e)]['_otbTurnOrderWindow'];if(!_0x9c0acd)return;if(!_0x39ba8f)return;_0x9c0acd[_0x574202(0x1f3)](_0x39ba8f);},BattleManager['refreshTurnOrder']=function(){const _0x5192b1=_0x205e7a;if(!this[_0x5192b1(0x31e)]())return;const _0x264424=SceneManager[_0x5192b1(0x26e)][_0x5192b1(0x22a)];if(!_0x264424)return;_0x264424[_0x5192b1(0x166)]();},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x168)]=BattleManager[_0x205e7a(0x31a)],BattleManager[_0x205e7a(0x31a)]=function(){const _0x418f77=_0x205e7a;VisuMZ[_0x418f77(0x10e)][_0x418f77(0x168)][_0x418f77(0x1e2)](this),this[_0x418f77(0x31e)]()&&(this['otbRemoveCurrentSubject'](),$gameParty[_0x418f77(0x18c)](),$gameTroop[_0x418f77(0x18c)]());},BattleManager[_0x205e7a(0x1a3)]=function(){const _0x499707=_0x205e7a;if(!this[_0x499707(0x31e)]())return;const _0x3f393c=SceneManager[_0x499707(0x26e)][_0x499707(0x22a)];if(!_0x3f393c)return;_0x3f393c[_0x499707(0x1f7)]();},BattleManager[_0x205e7a(0x277)]=function(){const _0x5afa47=_0x205e7a;if(!this[_0x5afa47(0x31e)]())return;const _0x152943=SceneManager['_scene'][_0x5afa47(0x22a)];if(!_0x152943)return;_0x152943[_0x5afa47(0x155)]();},BattleManager[_0x205e7a(0x201)]=function(_0x932991){const _0xbd41a8=_0x205e7a;if(!_0x932991)return;const _0x3abaec=_0x932991[_0xbd41a8(0x12e)]();_0x932991['makeActions']();if(!this[_0xbd41a8(0x1e7)][_0xbd41a8(0x221)](_0x932991)){const _0x5cff9d=Math[_0xbd41a8(0x1fa)](0x0,_0x3abaec-(_0x932991[_0xbd41a8(0x124)]||0x0));this['otbAddBattlerToTurnOrderAtEnd'](_0x932991,_0x5cff9d,this[_0xbd41a8(0x1e7)]);}if(!this['_otb_actionBattlersNext'][_0xbd41a8(0x221)](_0x932991)){const _0x363c01=_0x3abaec;this[_0xbd41a8(0x31c)](_0x932991,_0x363c01,this[_0xbd41a8(0x1d0)]);}},BattleManager['otbAddBattlerToTurnOrderAtEnd']=function(_0x5a9be4,_0x53e4f0,_0x48f6a5){const _0x1c21d0=_0x205e7a;if(!this[_0x1c21d0(0x31e)]())return;const _0x331a81=SceneManager[_0x1c21d0(0x26e)][_0x1c21d0(0x22a)];_0x5a9be4[_0x1c21d0(0x298)]();while(_0x53e4f0--){_0x48f6a5[_0x1c21d0(0x178)](_0x5a9be4),_0x331a81&&_0x331a81[_0x1c21d0(0x23a)](_0x5a9be4,_0x48f6a5);}},BattleManager[_0x205e7a(0x271)]=function(_0xfa742f){const _0x51995a=_0x205e7a;if(!_0xfa742f)return;const _0x3c2268=_0xfa742f[_0x51995a(0x12e)]();_0xfa742f[_0x51995a(0x298)]();if(!this['_actionBattlers']['includes'](_0xfa742f)){const _0x5f61fb=Math[_0x51995a(0x1fa)](0x0,_0x3c2268-(_0xfa742f['_otbTimesActedThisTurn']||0x0));this[_0x51995a(0x1c2)](_0xfa742f,_0x5f61fb,this[_0x51995a(0x1e7)]);}if(!this[_0x51995a(0x1d0)][_0x51995a(0x221)](_0xfa742f)){const _0x12b9f3=_0x3c2268;this[_0x51995a(0x1c2)](_0xfa742f,_0x12b9f3,this[_0x51995a(0x1d0)]);}},BattleManager['otbAddBattlerToTurnOrderAtStart']=function(_0xc96707,_0x20b3b1,_0x5c01a0){const _0x3c84a6=_0x205e7a;if(!this[_0x3c84a6(0x31e)]())return;const _0x532764=SceneManager[_0x3c84a6(0x26e)][_0x3c84a6(0x22a)];while(_0x20b3b1--){_0x5c01a0[_0x3c84a6(0x197)](_0xc96707),_0x532764&&_0x532764[_0x3c84a6(0x1c2)](_0xc96707,_0x5c01a0);}},BattleManager[_0x205e7a(0x14e)]=function(_0x9f57f2){const _0x4b4f41=_0x205e7a;if(!this[_0x4b4f41(0x31e)]())return;const _0x5ccae9=this['_actionBattlers'],_0xd03282=_0x9f57f2===this['_subject']?0x0:0x1;let _0x5c743d=0x0;for(let _0x64cdca=0x0;_0x64cdca<_0x5ccae9[_0x4b4f41(0x20a)];_0x64cdca++){const _0x1588ee=_0x5ccae9[_0x64cdca];if(!_0x1588ee)continue;if(!_0x1588ee[_0x4b4f41(0x1ee)])continue;if(!_0x1588ee[_0x4b4f41(0x1ee)][_0xd03282])continue;if(!_0x1588ee[_0x4b4f41(0x1ee)][_0xd03282][_0x4b4f41(0x1dd)])continue;_0x5c743d=_0x64cdca;}this[_0x4b4f41(0x1e7)]['splice'](_0x5c743d,0x0,_0x9f57f2);const _0xc9588b=SceneManager[_0x4b4f41(0x26e)]['_otbTurnOrderWindow'];_0xc9588b&&_0xc9588b['addForceActionBattler'](_0x9f57f2,_0x5c743d);},BattleManager['otbPreviewOrderClear']=function(){const _0x50382e=_0x205e7a;if(!this['isOTB']())return;const _0xbadfdc=SceneManager[_0x50382e(0x26e)]['_otbTurnOrderWindow'];if(!_0xbadfdc)return;_0xbadfdc['previewOrderByAction'](null);},BattleManager[_0x205e7a(0x1d8)]=function(){const _0xef87fc=_0x205e7a;if(!this[_0xef87fc(0x31e)]())return;const _0x1460ff=SceneManager['_scene'][_0xef87fc(0x22a)];if(!_0x1460ff)return;_0x1460ff[_0xef87fc(0x19e)](this[_0xef87fc(0x17d)]());},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1a7)]=Game_System['prototype'][_0x205e7a(0x2bc)],Game_System[_0x205e7a(0x1a4)]['initialize']=function(){const _0x287b0f=_0x205e7a;VisuMZ['BattleSystemOTB'][_0x287b0f(0x1a7)][_0x287b0f(0x1e2)](this),this['initBattleSystemOTB']();},Game_System[_0x205e7a(0x1a4)]['initBattleSystemOTB']=function(){this['_otbTurnOrderVisible']=!![];},Game_System[_0x205e7a(0x1a4)][_0x205e7a(0x253)]=function(){const _0x2633c1=_0x205e7a;return this[_0x2633c1(0x2b8)]===undefined&&this[_0x2633c1(0x132)](),this[_0x2633c1(0x2b8)];},Game_System[_0x205e7a(0x1a4)][_0x205e7a(0x2cf)]=function(_0x1822ce){const _0x3f9e78=_0x205e7a;this[_0x3f9e78(0x2b8)]===undefined&&this['initBattleSystemOTB'](),this[_0x3f9e78(0x2b8)]=_0x1822ce;},Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN']=VisuMZ['BattleSystemOTB'][_0x205e7a(0x18b)][_0x205e7a(0x200)][_0x205e7a(0x1ae)],Game_Action[_0x205e7a(0x2c6)]=VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x18b)][_0x205e7a(0x200)][_0x205e7a(0x2bd)],Game_Action[_0x205e7a(0x1df)]=VisuMZ['BattleSystemOTB'][_0x205e7a(0x18b)]['Conversion']['ConvertAgiBuffNext'],Game_Action[_0x205e7a(0x160)]=VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x18b)][_0x205e7a(0x200)][_0x205e7a(0x25f)],VisuMZ['BattleSystemOTB'][_0x205e7a(0x11d)]=Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x112)],Game_Action[_0x205e7a(0x1a4)]['speed']=function(){const _0x594c59=_0x205e7a;return BattleManager[_0x594c59(0x31e)]()?0x0:VisuMZ[_0x594c59(0x10e)][_0x594c59(0x11d)][_0x594c59(0x1e2)](this);},VisuMZ['BattleSystemOTB']['Game_Action_applyGlobal']=Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x23d)],Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x23d)]=function(){const _0x53bf2c=_0x205e7a;VisuMZ['BattleSystemOTB'][_0x53bf2c(0x29f)][_0x53bf2c(0x1e2)](this),this['applyGlobalBattleSystemOTB']();},Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x2b5)]=function(){const _0x4e5035=_0x205e7a;if(!SceneManager[_0x4e5035(0x26d)]())return;if(!BattleManager[_0x4e5035(0x31e)]())return;if(!this[_0x4e5035(0x2f5)]())return;if(!this[_0x4e5035(0x18a)]())return;const _0x201c33=VisuMZ[_0x4e5035(0x10e)][_0x4e5035(0x12d)],_0x23fd08=this[_0x4e5035(0x2f5)]()[_0x4e5035(0x24b)];_0x23fd08[_0x4e5035(0x2b6)](_0x201c33['Instant'])&&this[_0x4e5035(0x18a)]()[_0x4e5035(0x25a)](0x1);let _0x151402=this[_0x4e5035(0x31f)](),_0x146393=this['otbCalcUserNextOrderChange']();_0x151402!==0x0&&BattleManager[_0x4e5035(0x1c3)](this[_0x4e5035(0x18a)](),-_0x151402,![]),_0x146393!==0x0&&BattleManager[_0x4e5035(0x1c3)](this[_0x4e5035(0x18a)](),-_0x146393,!![]);},Game_Action['prototype'][_0x205e7a(0x31f)]=function(){const _0x527580=_0x205e7a;if(!SceneManager[_0x527580(0x26d)]())return 0x0;if(!BattleManager[_0x527580(0x31e)]())return 0x0;if(!this[_0x527580(0x2f5)]())return 0x0;if(!this['subject']())return 0x0;if(!this['subject']()[_0x527580(0x1f4)]())return 0x0;const _0xf2966c=VisuMZ[_0x527580(0x10e)][_0x527580(0x12d)],_0x3ed818=this[_0x527580(0x2f5)]()['note'],_0x4358a1=BattleManager[_0x527580(0x1e7)]||[];let _0x337b2b=0x0;return _0x3ed818[_0x527580(0x2b6)](_0xf2966c[_0x527580(0x30b)])&&(_0x4358a1[_0x527580(0x221)](this[_0x527580(0x18a)]())&&(_0x337b2b+=Number(RegExp['$1']))),_0x3ed818[_0x527580(0x2b6)](_0xf2966c[_0x527580(0x318)])&&(_0x337b2b+=Number(RegExp['$1'])),_0x337b2b;},Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x2d8)]=function(){const _0x17b20e=_0x205e7a;if(!SceneManager[_0x17b20e(0x26d)]())return 0x0;if(!BattleManager[_0x17b20e(0x31e)]())return 0x0;if(!this['item']())return 0x0;if(!this[_0x17b20e(0x18a)]())return 0x0;if(!this[_0x17b20e(0x18a)]()[_0x17b20e(0x1f4)]())return 0x0;const _0x475135=VisuMZ[_0x17b20e(0x10e)][_0x17b20e(0x18b)][_0x17b20e(0x10f)],_0x5c9906=VisuMZ['BattleSystemOTB']['RegExp'],_0x382fb3=this[_0x17b20e(0x2f5)]()[_0x17b20e(0x24b)],_0x2d3171=BattleManager[_0x17b20e(0x1e7)]||[],_0x4c6d1f=BattleManager[_0x17b20e(0x1d0)]||[];let _0xe43e4c=0x0;return _0x475135[_0x17b20e(0x1cd)]&&(_0xe43e4c+=_0x475135[_0x17b20e(0x1cd)][_0x17b20e(0x1e2)](this)),_0x382fb3[_0x17b20e(0x2b6)](_0x5c9906[_0x17b20e(0x30b)])&&(_0x4c6d1f[_0x17b20e(0x221)](this[_0x17b20e(0x18a)]())&&!_0x2d3171[_0x17b20e(0x221)](this[_0x17b20e(0x18a)]())&&(_0xe43e4c+=Number(RegExp['$1']))),_0x382fb3[_0x17b20e(0x2b6)](_0x5c9906['UserNextOrder'])&&(_0xe43e4c+=Number(RegExp['$1'])),_0xe43e4c;},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1c8)]=Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x120)],Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x120)]=function(_0x385edd){const _0x4c9ae5=_0x205e7a;VisuMZ['BattleSystemOTB']['Game_Action_applyItemUserEffect'][_0x4c9ae5(0x1e2)](this,_0x385edd),this[_0x4c9ae5(0x2d9)](_0x385edd),this[_0x4c9ae5(0x17b)](_0x385edd);},Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x2d9)]=function(_0x3171bc){const _0x1bebef=_0x205e7a;if(!SceneManager[_0x1bebef(0x26d)]())return;if(!BattleManager['isOTB']())return;if(!this[_0x1bebef(0x2f5)]())return;if(!_0x3171bc)return;const _0x49d64c=VisuMZ[_0x1bebef(0x10e)]['RegExp'],_0x5a6076=this[_0x1bebef(0x2f5)]()[_0x1bebef(0x24b)];if(_0x5a6076[_0x1bebef(0x2b6)](_0x49d64c['UserAddActionCurrent'])){const _0x29dbb5=!![],_0x2710a3=Number(RegExp['$1'])||0x0;this[_0x1bebef(0x18a)]()[_0x1bebef(0x2ef)](_0x2710a3,_0x29dbb5);}if(_0x5a6076['match'](_0x49d64c['UserAddActionNext'])){const _0xcbb51=![],_0x3cf88f=Number(RegExp['$1'])||0x0;this[_0x1bebef(0x18a)]()[_0x1bebef(0x2ef)](_0x3cf88f,_0xcbb51);}if(_0x5a6076[_0x1bebef(0x2b6)](_0x49d64c[_0x1bebef(0x184)])){const _0x806f27=!![],_0xae1a3c=Number(RegExp['$1'])||0x0;_0x3171bc[_0x1bebef(0x2ef)](_0xae1a3c,_0x806f27);}if(_0x5a6076[_0x1bebef(0x2b6)](_0x49d64c[_0x1bebef(0x2da)])){const _0x2c88b4=![],_0x29dd0e=Number(RegExp['$1'])||0x0;_0x3171bc[_0x1bebef(0x2ef)](_0x29dd0e,_0x2c88b4);}},Game_Action['prototype'][_0x205e7a(0x17b)]=function(_0x1a8be7){const _0x4f0629=_0x205e7a;if(!SceneManager[_0x4f0629(0x26d)]())return;if(!BattleManager[_0x4f0629(0x31e)]())return;if(!this[_0x4f0629(0x2f5)]())return;if(!_0x1a8be7)return;if(!_0x1a8be7[_0x4f0629(0x1f4)]())return 0x0;let _0x25dc23=this[_0x4f0629(0x236)](_0x1a8be7),_0x5cdbb2=this[_0x4f0629(0x215)](_0x1a8be7);_0x25dc23!==0x0&&BattleManager['turnOrderChangeOTB'](_0x1a8be7,-_0x25dc23,![]),_0x5cdbb2!==0x0&&BattleManager[_0x4f0629(0x1c3)](_0x1a8be7,-_0x5cdbb2,!![]);},Game_Action['prototype'][_0x205e7a(0x236)]=function(_0x4ebe62){const _0x5e29e9=_0x205e7a;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x5e29e9(0x31e)]())return 0x0;if(!this['item']())return 0x0;if(!_0x4ebe62)return 0x0;if(!_0x4ebe62[_0x5e29e9(0x1f4)]())return 0x0;const _0x541785=VisuMZ['BattleSystemOTB'][_0x5e29e9(0x12d)],_0x5f5ac4=this[_0x5e29e9(0x2f5)]()[_0x5e29e9(0x24b)],_0x20a4b6=BattleManager[_0x5e29e9(0x1e7)]||[];let _0x1a3553=0x0;_0x5f5ac4[_0x5e29e9(0x2b6)](_0x541785['TargetFollOrder'])&&(_0x20a4b6[_0x5e29e9(0x221)](_0x4ebe62)&&(_0x1a3553+=Number(RegExp['$1'])));_0x5f5ac4[_0x5e29e9(0x2b6)](_0x541785[_0x5e29e9(0x190)])&&(_0x1a3553+=Number(RegExp['$1']));const _0x4741f6=this[_0x5e29e9(0x2f5)]()[_0x5e29e9(0x12f)];for(const _0x26c8b1 of _0x4741f6){if(!_0x26c8b1)continue;if(_0x26c8b1[_0x5e29e9(0x1f1)]===Game_Action[_0x5e29e9(0x1fd)]&&_0x26c8b1[_0x5e29e9(0x237)]===0x6){if(Game_Action[_0x5e29e9(0x128)])_0x1a3553-=0x1;}if(_0x26c8b1[_0x5e29e9(0x1f1)]===Game_Action[_0x5e29e9(0x310)]&&_0x26c8b1[_0x5e29e9(0x237)]===0x6){if(Game_Action['OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN'])_0x1a3553+=0x1;}}return _0x1a3553;},Game_Action['prototype'][_0x205e7a(0x215)]=function(_0x2b9a86){const _0x2b821b=_0x205e7a;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x2b821b(0x31e)]())return 0x0;if(!this[_0x2b821b(0x2f5)]())return 0x0;if(!_0x2b9a86)return 0x0;if(!_0x2b9a86[_0x2b821b(0x1f4)]())return 0x0;const _0x4a8381=VisuMZ[_0x2b821b(0x10e)][_0x2b821b(0x12d)],_0x22b9b9=this[_0x2b821b(0x2f5)]()[_0x2b821b(0x24b)],_0x23f3d0=BattleManager[_0x2b821b(0x1e7)]||[],_0x2800ff=BattleManager[_0x2b821b(0x1d0)]||[];let _0x52de4c=0x0;_0x22b9b9[_0x2b821b(0x2b6)](_0x4a8381[_0x2b821b(0x102)])&&(_0x2800ff[_0x2b821b(0x221)](_0x2b9a86)&&!_0x23f3d0[_0x2b821b(0x221)](_0x2b9a86)&&(_0x52de4c+=Number(RegExp['$1'])));_0x22b9b9[_0x2b821b(0x2b6)](_0x4a8381['TargetNextOrder'])&&(_0x52de4c+=Number(RegExp['$1']));const _0x1ea923=this['item']()[_0x2b821b(0x12f)];for(const _0xbe9e64 of _0x1ea923){if(!_0xbe9e64)continue;if(_0xbe9e64[_0x2b821b(0x1f1)]===Game_Action[_0x2b821b(0x1fd)]&&_0xbe9e64[_0x2b821b(0x237)]===0x6){if(Game_Action[_0x2b821b(0x1df)])_0x52de4c-=0x1;}if(_0xbe9e64[_0x2b821b(0x1f1)]===Game_Action['EFFECT_ADD_DEBUFF']&&_0xbe9e64[_0x2b821b(0x237)]===0x6){if(Game_Action[_0x2b821b(0x160)])_0x52de4c+=0x1;}}return _0x52de4c;},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x111)]=function(){const _0x43f009=_0x205e7a;delete this[_0x43f009(0x320)],delete this[_0x43f009(0x174)],delete this[_0x43f009(0x229)],delete this[_0x43f009(0x280)];},Game_BattlerBase[_0x205e7a(0x1a4)]['TurnOrderOTBGraphicType']=function(){const _0x26aab5=_0x205e7a;return this['_otbTurnOrderGraphicType']===undefined&&(this[_0x26aab5(0x320)]=this[_0x26aab5(0x2fb)]()),this['_otbTurnOrderGraphicType'];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x2fb)]=function(){const _0x27f79f=_0x205e7a;return Window_OTB_TurnOrder[_0x27f79f(0x18b)][_0x27f79f(0x2ec)];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x245)]=function(){const _0x4cc95a=_0x205e7a;return this[_0x4cc95a(0x174)]===undefined&&(this['_otbTurnOrderFaceName']=this[_0x4cc95a(0x242)]()),this[_0x4cc95a(0x174)];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x242)]=function(){const _0x5970f8=_0x205e7a;return Window_OTB_TurnOrder[_0x5970f8(0x18b)][_0x5970f8(0x2a1)];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x19f)]=function(){const _0x3a69b6=_0x205e7a;return this[_0x3a69b6(0x229)]===undefined&&(this[_0x3a69b6(0x229)]=this[_0x3a69b6(0x142)]()),this[_0x3a69b6(0x229)];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x142)]=function(){const _0x41748c=_0x205e7a;return Window_OTB_TurnOrder['Settings'][_0x41748c(0x260)];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x113)]=function(){const _0x10dc2d=_0x205e7a;return this['_otbTurnOrderIconIndex']===undefined&&(this[_0x10dc2d(0x280)]=this[_0x10dc2d(0x1d6)]()),this['_otbTurnOrderIconIndex'];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x1d6)]=function(){const _0x319ce3=_0x205e7a;return Window_OTB_TurnOrder['Settings'][_0x319ce3(0x119)];},Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x20f)]=function(_0xc10715){const _0x175ded=_0x205e7a;this[_0x175ded(0x280)]=_0xc10715;},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x17a)]=Game_BattlerBase['prototype'][_0x205e7a(0x29e)],Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x29e)]=function(){const _0x1676b6=_0x205e7a;VisuMZ['BattleSystemOTB']['Game_BattlerBase_hide'][_0x1676b6(0x1e2)](this),BattleManager[_0x1676b6(0x13c)]();},VisuMZ['BattleSystemOTB']['Game_BattlerBase_appear']=Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x106)],Game_BattlerBase[_0x205e7a(0x1a4)]['appear']=function(){const _0x72d06a=_0x205e7a,_0x5cd73d=this[_0x72d06a(0x2cb)];VisuMZ[_0x72d06a(0x10e)][_0x72d06a(0x146)][_0x72d06a(0x1e2)](this),BattleManager['isOTB']()&&SceneManager[_0x72d06a(0x26d)]()&&_0x5cd73d&&!this[_0x72d06a(0x2cb)]&&BattleManager['otbReturnBattlerToTurnOrders'](this);},VisuMZ[_0x205e7a(0x10e)]['Game_Battler_performCollapse']=Game_Battler[_0x205e7a(0x1a4)]['performCollapse'],Game_Battler[_0x205e7a(0x1a4)]['performCollapse']=function(){const _0x5e4787=_0x205e7a;VisuMZ['BattleSystemOTB']['Game_Battler_performCollapse'][_0x5e4787(0x1e2)](this),BattleManager[_0x5e4787(0x13c)]();},Game_Battler[_0x205e7a(0x25b)]=VisuMZ['BattleSystemOTB'][_0x205e7a(0x18b)][_0x205e7a(0x10f)][_0x205e7a(0x167)],VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x244)]=Game_Battler['prototype'][_0x205e7a(0x241)],Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x241)]=function(_0xfd87b4){const _0x2ce3e7=_0x205e7a;VisuMZ[_0x2ce3e7(0x10e)]['Game_Battler_onBattleStart'][_0x2ce3e7(0x1e2)](this,_0xfd87b4),this[_0x2ce3e7(0x324)](_0xfd87b4);},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x324)]=function(_0x4d69c1){const _0xc83a68=_0x205e7a;if(!BattleManager[_0xc83a68(0x31e)]())return;this[_0xc83a68(0x124)]=0x0,this['_cache_makeActionTimesOTB']=undefined;},VisuMZ['BattleSystemOTB']['Game_Battler_onBattleEnd']=Game_Battler['prototype'][_0x205e7a(0x20e)],Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x20e)]=function(){const _0x23ad72=_0x205e7a;VisuMZ['BattleSystemOTB'][_0x23ad72(0x14c)]['call'](this),this[_0x23ad72(0x1a0)]();},Game_Battler[_0x205e7a(0x1a4)]['onBattleEndOTB']=function(){const _0x4f4f87=_0x205e7a;if(!BattleManager['isOTB']())return;this[_0x4f4f87(0x124)]=0x0;},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x289)]=function(){const _0x321dbb=_0x205e7a;if(!BattleManager[_0x321dbb(0x31e)]())return;this[_0x321dbb(0x124)]=this['_otbTimesActedThisTurn']||0x0,this['_otbTimesActedThisTurn']++;if(this[_0x321dbb(0x159)]()>0x0&&this===BattleManager[_0x321dbb(0x30d)]){const _0x56d283=BattleManager['_forcedBattlers'];if(_0x56d283[_0x321dbb(0x20a)]>0x0&&_0x56d283[0x0]!==this)return;const _0x25009f=this[_0x321dbb(0x21c)]();if(_0x25009f&&BattleManager[_0x321dbb(0x14d)](this))_0x25009f[_0x321dbb(0x16f)]();}},BattleManager['isNextOtbSubject']=function(_0x25b8dd){const _0x51c6a2=_0x205e7a;if(!_0x25b8dd)return![];return this[_0x51c6a2(0x1e7)][0x0]===_0x25b8dd;},VisuMZ[_0x205e7a(0x10e)]['Game_Battler_onTurnEnd']=Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x10a)],Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x10a)]=function(){const _0x5a8256=_0x205e7a;VisuMZ[_0x5a8256(0x10e)][_0x5a8256(0x15f)][_0x5a8256(0x1e2)](this),this[_0x5a8256(0x14a)]();},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x14a)]=function(){const _0x2f2c1c=_0x205e7a;if(!BattleManager[_0x2f2c1c(0x31e)]())return;this[_0x2f2c1c(0x124)]=0x0;},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x153)]=Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2b1)],Game_Battler[_0x205e7a(0x1a4)]['makeSpeed']=function(){const _0x32c9a3=_0x205e7a;BattleManager[_0x32c9a3(0x31e)]()?this[_0x32c9a3(0x2ce)]():VisuMZ[_0x32c9a3(0x10e)][_0x32c9a3(0x153)]['call'](this);},Game_Battler['prototype'][_0x205e7a(0x2ce)]=function(){const _0x5c23f6=_0x205e7a;if(this[_0x5c23f6(0x27d)]())this[_0x5c23f6(0x214)]=Infinity;else{const _0xf0db47=this['currentAction']()||new Game_Action(this);this[_0x5c23f6(0x214)]=VisuMZ[_0x5c23f6(0x10e)]['Settings'][_0x5c23f6(0x10f)][_0x5c23f6(0x16c)][_0x5c23f6(0x1e2)](_0xf0db47);}},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x27d)]=function(){const _0x244738=_0x205e7a;if(!Game_Battler['OTB_STUN_INFINITY_SPEED'])return![];if(!this[_0x244738(0x2c5)]())return![];if(!this[_0x244738(0x2eb)]())return![];if(this[_0x244738(0x100)]())return![];const _0x2bfc1f=JsonEx['makeDeepCopy'](this);return _0x2bfc1f[_0x244738(0x1bf)]=!![],_0x2bfc1f[_0x244738(0x1d2)]=!![],_0x2bfc1f[_0x244738(0x12b)](),_0x2bfc1f[_0x244738(0x27a)](0x1),_0x2bfc1f['removeStatesAuto'](0x2),_0x2bfc1f[_0x244738(0x117)](),_0x2bfc1f[_0x244738(0x100)]();},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x28b)]=Game_Action[_0x205e7a(0x1a4)][_0x205e7a(0x30e)],Game_Action[_0x205e7a(0x1a4)]['allowRandomSpeed']=function(){const _0x12a083=_0x205e7a;return BattleManager[_0x12a083(0x31e)]()?VisuMZ[_0x12a083(0x10e)][_0x12a083(0x18b)][_0x12a083(0x10f)][_0x12a083(0x1ea)]:VisuMZ[_0x12a083(0x10e)][_0x12a083(0x28b)][_0x12a083(0x1e2)](this);},Game_Battler['prototype'][_0x205e7a(0x25a)]=function(_0x534faf){const _0x51f67f=_0x205e7a;if(!this['canMove']())return;this[_0x51f67f(0x124)]=this[_0x51f67f(0x124)]||0x0,this[_0x51f67f(0x124)]--,BattleManager[_0x51f67f(0x295)](this,_0x534faf,BattleManager[_0x51f67f(0x1e7)]);},Game_Battler[_0x205e7a(0x1a4)]['otbAddActions']=function(_0x240728,_0x557cdc){const _0x4513af=_0x205e7a;if(!this[_0x4513af(0x100)]())return;_0x557cdc?BattleManager[_0x4513af(0x31c)](this,_0x240728,BattleManager[_0x4513af(0x1e7)]):BattleManager[_0x4513af(0x31c)](this,_0x240728,BattleManager[_0x4513af(0x1d0)]);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x2b3)]=Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x12e)],Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x12e)]=function(){const _0x2e9cb2=_0x205e7a;return BattleManager[_0x2e9cb2(0x31e)]()?this['makeActionTimesOTB']():VisuMZ[_0x2e9cb2(0x10e)][_0x2e9cb2(0x2b3)][_0x2e9cb2(0x1e2)](this);},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x281)]=function(){const _0x2a78fc=_0x205e7a;if(this[_0x2a78fc(0x296)]!==undefined)return this[_0x2a78fc(0x296)];this[_0x2a78fc(0x108)]=this['actionPlusSet']()[_0x2a78fc(0x20a)];const _0x3ce305=this['actionPlusSet'](),_0x88a75d=_0x3ce305['reduce']((_0x3bfe57,_0x4e2850)=>Math[_0x2a78fc(0x1a9)]()<_0x4e2850?_0x3bfe57+0x1:_0x3bfe57,0x1);return this[_0x2a78fc(0x296)]=_0x88a75d,this[_0x2a78fc(0x296)];},Game_Unit[_0x205e7a(0x1a4)][_0x205e7a(0x18c)]=function(){const _0x6213b=_0x205e7a;for(const _0x1f1963 of this[_0x6213b(0x28d)]()){_0x1f1963&&(_0x1f1963[_0x6213b(0x296)]=undefined);}},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x1f4)]=function(){const _0x2205a2=_0x205e7a;if(this[_0x2205a2(0x112)]()===Infinity)return![];return!![];},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x16a)]=function(_0x3b2309,_0x193427){const _0x19fc4f=_0x205e7a;if(this[_0x19fc4f(0x1d2)]||this[_0x19fc4f(0x1bf)])return;if(!SceneManager[_0x19fc4f(0x26d)]())return;if(!BattleManager['isOTB']())return;if(this['_last_otb_actionPlusSetLength']!==this['actionPlusSet']()['length'])this[_0x19fc4f(0x108)]=this[_0x19fc4f(0x239)]()[_0x19fc4f(0x20a)],this[_0x19fc4f(0x296)]=undefined;else return;if(_0x3b2309&&!this[_0x19fc4f(0x100)]())BattleManager[_0x19fc4f(0x13c)]();else!_0x3b2309&&this[_0x19fc4f(0x100)]()&&BattleManager[_0x19fc4f(0x201)](this);if(this[_0x19fc4f(0x100)]()){const _0xd76ba3=this[_0x19fc4f(0x12e)]()-_0x193427;_0xd76ba3>0x0&&(BattleManager[_0x19fc4f(0x31c)](this,_0xd76ba3,BattleManager[_0x19fc4f(0x1e7)]),BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0xd76ba3,BattleManager[_0x19fc4f(0x1d0)]));}},VisuMZ['BattleSystemOTB'][_0x205e7a(0x22e)]=Game_Battler['prototype'][_0x205e7a(0x2c2)],Game_Battler['prototype'][_0x205e7a(0x2c2)]=function(_0x339326){const _0x736208=_0x205e7a,_0x5f1484=this['canMove'](),_0xb14c71=this[_0x736208(0x12e)]();VisuMZ[_0x736208(0x10e)][_0x736208(0x22e)]['call'](this,_0x339326),this['_last_otb_actionPlusSetLength']=undefined,this[_0x736208(0x16a)](_0x5f1484,_0xb14c71);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x25e)]=Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2ba)],Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2ba)]=function(_0x29ae57){const _0x10993f=_0x205e7a,_0x25fd71=this['canMove'](),_0xcd4551=this[_0x10993f(0x12e)](),_0x28ed15=this[_0x10993f(0x1a6)](_0x29ae57);VisuMZ[_0x10993f(0x10e)]['Game_Battler_removeState'][_0x10993f(0x1e2)](this,_0x29ae57),_0x28ed15&&!this[_0x10993f(0x1a6)](_0x29ae57)&&(this[_0x10993f(0x108)]=undefined,this['otbProcessActionCheck'](_0x25fd71,_0xcd4551));},VisuMZ[_0x205e7a(0x10e)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x2e0)],Game_BattlerBase[_0x205e7a(0x1a4)][_0x205e7a(0x2e0)]=function(){const _0x1a5f30=_0x205e7a;if(BattleManager[_0x1a5f30(0x31e)]())this[_0x1a5f30(0x2ba)](this[_0x1a5f30(0x2bf)]());VisuMZ[_0x1a5f30(0x10e)][_0x1a5f30(0x176)][_0x1a5f30(0x1e2)](this);if(BattleManager[_0x1a5f30(0x31e)]())this[_0x1a5f30(0x117)]();},VisuMZ[_0x205e7a(0x10e)]['Game_Battler_forceAction']=Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x274)],Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x274)]=function(_0x2c6a14,_0x4e4704){const _0x1851d2=_0x205e7a;BattleManager[_0x1851d2(0x31e)]()?this[_0x1851d2(0x291)](_0x2c6a14,_0x4e4704):VisuMZ[_0x1851d2(0x10e)][_0x1851d2(0x189)][_0x1851d2(0x1e2)](this,_0x2c6a14,_0x4e4704);},Game_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x291)]=function(_0x48f94c,_0x32e102){const _0x41ba71=_0x205e7a,_0x13be77=new Game_Action(this,!![]);_0x13be77['setSkill'](_0x48f94c),_0x13be77[_0x41ba71(0x1dd)]=!![];if(_0x32e102===-0x2)_0x13be77[_0x41ba71(0x278)](this[_0x41ba71(0x2a4)]);else _0x32e102===-0x1?_0x13be77[_0x41ba71(0x269)]():_0x13be77['setTarget'](_0x32e102);let _0x2849b4=this[_0x41ba71(0x1ee)][_0x41ba71(0x232)](_0x578218=>_0x578218[_0x41ba71(0x1dd)]);if(this===BattleManager['_subject'])_0x2849b4=Math[_0x41ba71(0x1fa)](_0x2849b4,0x0);_0x2849b4++,this[_0x41ba71(0x1ee)][_0x41ba71(0x2de)](_0x2849b4,0x0,_0x13be77);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x32b)]=BattleManager[_0x205e7a(0x274)],BattleManager['forceAction']=function(_0x2a7b25){const _0x27a257=_0x205e7a;BattleManager['isOTB']()?this[_0x27a257(0x291)](_0x2a7b25):VisuMZ[_0x27a257(0x10e)][_0x27a257(0x32b)]['call'](this,_0x2a7b25);},BattleManager[_0x205e7a(0x291)]=function(_0x552643){BattleManager['otbAddForceActionBattler'](_0x552643);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x2d2)]=Game_Actor[_0x205e7a(0x1a4)][_0x205e7a(0x1d9)],Game_Actor[_0x205e7a(0x1a4)]['selectNextCommand']=function(){const _0x19c8d4=_0x205e7a;if(BattleManager[_0x19c8d4(0x31e)]()){if(this[_0x19c8d4(0x21c)]())this[_0x19c8d4(0x21c)]()[_0x19c8d4(0x16f)]();return![];}return VisuMZ[_0x19c8d4(0x10e)]['Game_Actor_selectNextCommand'][_0x19c8d4(0x1e2)](this);},Game_Actor[_0x205e7a(0x1a4)]['createTurnOrderOTBGraphicType']=function(){const _0x2827c0=_0x205e7a,_0x477703=this['actor']()[_0x2827c0(0x24b)];if(_0x477703['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2827c0(0x1e8);else{if(_0x477703[_0x2827c0(0x2b6)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x2827c0(0x327);}return Window_OTB_TurnOrder[_0x2827c0(0x18b)][_0x2827c0(0x2dd)];},Game_Actor[_0x205e7a(0x1a4)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x3a4ef4=_0x205e7a,_0x1e635c=this['actor']()[_0x3a4ef4(0x24b)];if(_0x1e635c[_0x3a4ef4(0x2b6)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x3a4ef4(0x10c)]();},Game_Actor[_0x205e7a(0x1a4)]['createTurnOrderOTBGraphicFaceIndex']=function(){const _0x3fcd83=_0x205e7a,_0x302fe1=this['actor']()[_0x3fcd83(0x24b)];if(_0x302fe1[_0x3fcd83(0x2b6)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x3fcd83(0x13d)]();},Game_Actor[_0x205e7a(0x1a4)][_0x205e7a(0x1d6)]=function(){const _0x1c7f0a=_0x205e7a,_0x478bcf=this[_0x1c7f0a(0x2fc)]()[_0x1c7f0a(0x24b)];if(_0x478bcf['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x1c7f0a(0x18b)]['ActorBattlerIcon'];},Game_Enemy[_0x205e7a(0x1a4)]['createTurnOrderOTBGraphicType']=function(){const _0x424651=_0x205e7a,_0xd6380=this[_0x424651(0x32a)]()[_0x424651(0x24b)];if(_0xd6380[_0x424651(0x2b6)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x424651(0x1e8);else{if(_0xd6380[_0x424651(0x2b6)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x424651(0x327);}return Window_OTB_TurnOrder[_0x424651(0x18b)][_0x424651(0x2ec)];},Game_Enemy[_0x205e7a(0x1a4)][_0x205e7a(0x242)]=function(){const _0x2d6366=_0x205e7a,_0x2b7f8c=this[_0x2d6366(0x32a)]()[_0x2d6366(0x24b)];if(_0x2b7f8c[_0x2d6366(0x2b6)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_OTB_TurnOrder[_0x2d6366(0x18b)][_0x2d6366(0x2a1)];},Game_Enemy[_0x205e7a(0x1a4)][_0x205e7a(0x142)]=function(){const _0x3296e9=_0x205e7a,_0x5bd395=this['enemy']()[_0x3296e9(0x24b)];if(_0x5bd395[_0x3296e9(0x2b6)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x3296e9(0x18b)][_0x3296e9(0x260)];},Game_Enemy[_0x205e7a(0x1a4)][_0x205e7a(0x1d6)]=function(){const _0x25d5f4=_0x205e7a,_0x2a6ab0=this[_0x25d5f4(0x32a)]()['note'];if(_0x2a6ab0[_0x25d5f4(0x2b6)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x25d5f4(0x18b)]['EnemyBattlerIcon'];},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x32c)]=Game_Party['prototype']['addActor'],Game_Party['prototype'][_0x205e7a(0x312)]=function(_0x58cbbe){const _0x332a5f=_0x205e7a;VisuMZ[_0x332a5f(0x10e)][_0x332a5f(0x32c)][_0x332a5f(0x1e2)](this,_0x58cbbe);if(Imported['VisuMZ_2_PartySystem'])return;SceneManager['isSceneBattle']()&&BattleManager[_0x332a5f(0x31e)]()&&(BattleManager['removeActionBattlersOTB'](),BattleManager[_0x332a5f(0x201)]($gameActors[_0x332a5f(0x2fc)](_0x58cbbe)));},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1ed)]=Game_Party[_0x205e7a(0x1a4)][_0x205e7a(0x222)],Game_Party[_0x205e7a(0x1a4)][_0x205e7a(0x222)]=function(_0x4a75bf){const _0x1d5754=_0x205e7a;VisuMZ[_0x1d5754(0x10e)][_0x1d5754(0x1ed)][_0x1d5754(0x1e2)](this,_0x4a75bf),SceneManager[_0x1d5754(0x26d)]()&&BattleManager['isOTB']()&&BattleManager[_0x1d5754(0x13c)]();},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1b2)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x266)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x266)]=function(){const _0x4d413f=_0x205e7a;VisuMZ[_0x4d413f(0x10e)][_0x4d413f(0x1b2)][_0x4d413f(0x1e2)](this),BattleManager[_0x4d413f(0x31e)]()&&this[_0x4d413f(0x1b4)]();},Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1b4)]=function(){const _0x579229=_0x205e7a,_0x471cfc=this[_0x579229(0x2d5)];this[_0x579229(0x26f)]()&&delete _0x471cfc[_0x579229(0x30c)][_0x579229(0x22b)];},VisuMZ[_0x205e7a(0x10e)]['Scene_Battle_commandCancel']=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x2ff)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x2ff)]=function(){const _0x4cc015=_0x205e7a;BattleManager[_0x4cc015(0x31e)]()?this[_0x4cc015(0x20b)]():VisuMZ[_0x4cc015(0x10e)][_0x4cc015(0x1ab)][_0x4cc015(0x1e2)](this);},Scene_Battle['prototype'][_0x205e7a(0x20b)]=function(){const _0x3f2efd=_0x205e7a;BattleManager[_0x3f2efd(0x162)](),this[_0x3f2efd(0x26c)]['setup'](),this[_0x3f2efd(0x2d5)]['close']();},VisuMZ[_0x205e7a(0x10e)]['Scene_Battle_commandFight']=Scene_Battle['prototype'][_0x205e7a(0x152)],Scene_Battle['prototype'][_0x205e7a(0x152)]=function(){const _0x9b3a38=_0x205e7a;BattleManager[_0x9b3a38(0x31e)]()?this['startActorCommandSelection']():VisuMZ['BattleSystemOTB']['Scene_Battle_commandFight'][_0x9b3a38(0x1e2)](this);},VisuMZ['BattleSystemOTB'][_0x205e7a(0x2be)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x2fd)],Scene_Battle[_0x205e7a(0x1a4)]['createAllWindows']=function(){const _0x4891c6=_0x205e7a;VisuMZ['BattleSystemOTB'][_0x4891c6(0x2be)][_0x4891c6(0x1e2)](this),this['createOTBTurnOrderWindow']();},Scene_Battle[_0x205e7a(0x1a4)]['createOTBTurnOrderWindow']=function(){const _0x299eb0=_0x205e7a;if(!BattleManager['isOTB']())return;this[_0x299eb0(0x22a)]=new Window_OTB_TurnOrder();const _0x3bfd52=this[_0x299eb0(0x19b)](this[_0x299eb0(0x1ba)]);this[_0x299eb0(0x1f6)](this[_0x299eb0(0x22a)],_0x3bfd52),this[_0x299eb0(0x26b)](),SceneManager[_0x299eb0(0x1b7)]()&&this[_0x299eb0(0x22a)]['resumeTurnOrderSprites']();},Scene_Battle['prototype']['repositionLogWindowOTB']=function(){const _0x30b90a=_0x205e7a,_0x34af24=Window_OTB_TurnOrder[_0x30b90a(0x18b)];if(_0x34af24[_0x30b90a(0x1bd)]!=='top')return;if(!_0x34af24[_0x30b90a(0x248)])return;if(!this[_0x30b90a(0x30a)])return;const _0xce6903=this[_0x30b90a(0x22a)]['y']-Math[_0x30b90a(0x173)]((Graphics[_0x30b90a(0x235)]-Graphics[_0x30b90a(0x290)])/0x2),_0x47aeb4=_0xce6903+this[_0x30b90a(0x22a)][_0x30b90a(0x235)];this['_logWindow']['y']=_0x47aeb4+(_0x34af24[_0x30b90a(0x2f2)]||0x0);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x31d)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1d7)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1d7)]=function(){const _0x4736c5=_0x205e7a;BattleManager[_0x4736c5(0x162)](),VisuMZ[_0x4736c5(0x10e)][_0x4736c5(0x31d)]['call'](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x199)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x207)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x207)]=function(){const _0x2344d9=_0x205e7a;BattleManager['otbPreviewOrderClear'](),VisuMZ['BattleSystemOTB'][_0x2344d9(0x199)][_0x2344d9(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x227)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x145)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x145)]=function(){const _0x221995=_0x205e7a;BattleManager[_0x221995(0x162)](),VisuMZ[_0x221995(0x10e)][_0x221995(0x227)]['call'](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x22f)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1e1)],Scene_Battle[_0x205e7a(0x1a4)]['onActorCancel']=function(){const _0x419121=_0x205e7a;BattleManager[_0x419121(0x162)](),VisuMZ['BattleSystemOTB']['Scene_Battle_onActorCancel'][_0x419121(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x110)]=Scene_Battle[_0x205e7a(0x1a4)]['onEnemyOk'],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1da)]=function(){const _0x191751=_0x205e7a;BattleManager[_0x191751(0x162)](),VisuMZ[_0x191751(0x10e)][_0x191751(0x110)]['call'](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_onEnemyCancel']=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1de)],Scene_Battle[_0x205e7a(0x1a4)]['onEnemyCancel']=function(){const _0x1ff1f4=_0x205e7a;BattleManager[_0x1ff1f4(0x162)](),VisuMZ[_0x1ff1f4(0x10e)][_0x1ff1f4(0x2df)][_0x1ff1f4(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x1e5)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x25c)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x25c)]=function(){const _0x4e7bb1=_0x205e7a;BattleManager[_0x4e7bb1(0x162)](),VisuMZ[_0x4e7bb1(0x10e)]['Scene_Battle_onSkillOk'][_0x4e7bb1(0x1e2)](this);},VisuMZ['BattleSystemOTB'][_0x205e7a(0x1b0)]=Scene_Battle['prototype'][_0x205e7a(0x240)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x240)]=function(){const _0x462476=_0x205e7a;BattleManager[_0x462476(0x162)](),VisuMZ[_0x462476(0x10e)][_0x462476(0x1b0)]['call'](this);},VisuMZ['BattleSystemOTB'][_0x205e7a(0x150)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x1c5)],Scene_Battle[_0x205e7a(0x1a4)]['onItemOk']=function(){const _0x50acfb=_0x205e7a;BattleManager[_0x50acfb(0x162)](),VisuMZ[_0x50acfb(0x10e)][_0x50acfb(0x150)][_0x50acfb(0x1e2)](this);},VisuMZ['BattleSystemOTB'][_0x205e7a(0x2c9)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x16e)],Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x16e)]=function(){const _0x1d7500=_0x205e7a;BattleManager[_0x1d7500(0x162)](),VisuMZ[_0x1d7500(0x10e)]['Scene_Battle_onItemCancel'][_0x1d7500(0x1e2)](this);},VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x331)]=Scene_Battle[_0x205e7a(0x1a4)][_0x205e7a(0x270)],Scene_Battle[_0x205e7a(0x1a4)]['actorCommandSingleSkill']=function(){const _0x574a47=_0x205e7a;BattleManager[_0x574a47(0x162)](),VisuMZ[_0x574a47(0x10e)][_0x574a47(0x331)][_0x574a47(0x1e2)](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x5c4db3=_0x205e7a;this[_0x5c4db3(0x2bc)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]=Object[_0x205e7a(0x19d)](Sprite_Clickable['prototype']),Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2e2)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2bc)]=function(_0x20014f,_0x565182,_0x4fd5ba){const _0x13a3c4=_0x205e7a;this['initMembers'](_0x20014f,_0x565182,_0x4fd5ba),Sprite_Clickable[_0x13a3c4(0x1a4)][_0x13a3c4(0x2bc)][_0x13a3c4(0x1e2)](this),this[_0x13a3c4(0x1b5)]=0x0,this['createChildren'](),this['checkOpacity']();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x163)]=function(_0x484b9d,_0x5e6d30,_0x20355a){const _0x5e0ebe=_0x205e7a;this[_0x5e0ebe(0x279)]=_0x484b9d[_0x5e0ebe(0x2b7)]()?$gameParty:$gameTroop,this[_0x5e0ebe(0x202)]=_0x484b9d[_0x5e0ebe(0x218)](),this[_0x5e0ebe(0x1e0)]=_0x5e6d30,this[_0x5e0ebe(0x1b6)]=_0x20355a;const _0x4b55ea=Window_OTB_TurnOrder[_0x5e0ebe(0x18b)],_0x5c9426=this[_0x5e0ebe(0x1b8)]();this[_0x5e0ebe(0x333)]=0x0,this[_0x5e0ebe(0x2e4)]=_0x4b55ea['OrderDirection']?-_0x4b55ea['SpriteThin']:this['containerWindow']()['width'],this['_positionTargetY']=0x0,this[_0x5e0ebe(0x2ea)]=0x0,this[_0x5e0ebe(0x1f5)]=0xff,this[_0x5e0ebe(0x1e3)]=![],this['_isAppeared']=![],this[_0x5e0ebe(0x14b)]=0x0,this['_containerHeight']=0x0;},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x172)]=function(){const _0x484447=_0x205e7a;this[_0x484447(0x203)](),this[_0x484447(0x2a9)](),this['createGraphicSprite'](),this[_0x484447(0x268)](),this[_0x484447(0x134)]();},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['createInitialPositions']=function(){const _0x351f2b=_0x205e7a;this['x']=this['_positionTargetX'],this['y']=this[_0x351f2b(0x191)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x1b8)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x211)]=function(){const _0x53757d=_0x205e7a,_0xa8e5d0=Window_OTB_TurnOrder[_0x53757d(0x18b)];return _0xa8e5d0[_0x53757d(0x1a5)];},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x15a)]=function(){const _0x2066b2=_0x205e7a,_0x56f89f=Window_OTB_TurnOrder[_0x2066b2(0x18b)];return _0x56f89f[_0x2066b2(0x1be)];},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x24d)]=function(){const _0x2c17c2=_0x205e7a;return this[_0x2c17c2(0x279)]===$gameParty?_0x2c17c2(0x169):_0x2c17c2(0x1e4);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2a9)]=function(){const _0x232e76=_0x205e7a;if(!Window_OTB_TurnOrder['Settings'][_0x232e76(0x13a)])return;const _0x465609=Window_OTB_TurnOrder['Settings'],_0x4a9b4a=this['getUnitSideSide'](),_0x26c587='%1SystemBg'['format'](_0x4a9b4a),_0x275d7f=new Sprite();_0x275d7f['anchor']['x']=this[_0x232e76(0x195)]['x'],_0x275d7f[_0x232e76(0x195)]['y']=this[_0x232e76(0x195)]['y'];if(_0x465609[_0x26c587])_0x275d7f[_0x232e76(0x336)]=ImageManager['loadSystem'](_0x465609[_0x26c587]);else{const _0x1e2519=this[_0x232e76(0x211)](),_0x40727d=this[_0x232e76(0x15a)]();_0x275d7f[_0x232e76(0x336)]=new Bitmap(_0x1e2519,_0x40727d);const _0x5ee775=ColorManager[_0x232e76(0x1d5)](_0x465609[_0x232e76(0x2d7)[_0x232e76(0x2f6)](_0x4a9b4a)]),_0x2c5399=ColorManager['getColor'](_0x465609[_0x232e76(0x2e5)[_0x232e76(0x2f6)](_0x4a9b4a)]);_0x275d7f[_0x232e76(0x336)][_0x232e76(0x13e)](0x0,0x0,_0x1e2519,_0x40727d,_0x5ee775,_0x2c5399,!![]);}this[_0x232e76(0x216)]=_0x275d7f,this[_0x232e76(0x282)](this[_0x232e76(0x216)]),this[_0x232e76(0x179)]=this['_backgroundSprite']['width'],this[_0x232e76(0x235)]=this[_0x232e76(0x216)][_0x232e76(0x235)];},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x330)]=function(){const _0x4e8762=_0x205e7a,_0x18ec98=new Sprite();_0x18ec98[_0x4e8762(0x195)]['x']=this[_0x4e8762(0x195)]['x'],_0x18ec98[_0x4e8762(0x195)]['y']=this[_0x4e8762(0x195)]['y'],this[_0x4e8762(0x15e)]=_0x18ec98,this[_0x4e8762(0x282)](this[_0x4e8762(0x15e)]),this[_0x4e8762(0x2f3)]();},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x268)]=function(){const _0x3b8d8b=_0x205e7a;if(!Window_OTB_TurnOrder[_0x3b8d8b(0x18b)][_0x3b8d8b(0x228)])return;const _0x58752c=Window_OTB_TurnOrder['Settings'],_0x2b312a=this['getUnitSideSide'](),_0x59d00b=_0x3b8d8b(0x258)[_0x3b8d8b(0x2f6)](_0x2b312a),_0x4150c8=new Sprite();_0x4150c8[_0x3b8d8b(0x195)]['x']=this[_0x3b8d8b(0x195)]['x'],_0x4150c8[_0x3b8d8b(0x195)]['y']=this[_0x3b8d8b(0x195)]['y'];if(_0x58752c[_0x59d00b])_0x4150c8['bitmap']=ImageManager[_0x3b8d8b(0x198)](_0x58752c[_0x59d00b]);else{let _0x1feac2=this[_0x3b8d8b(0x211)](),_0x5c38ab=this[_0x3b8d8b(0x15a)](),_0x596e64=this[_0x3b8d8b(0x144)]();_0x4150c8[_0x3b8d8b(0x336)]=new Bitmap(_0x1feac2,_0x5c38ab);const _0x3f8080='#000000',_0x308ece=ColorManager[_0x3b8d8b(0x1d5)](_0x58752c[_0x3b8d8b(0x1b1)[_0x3b8d8b(0x2f6)](_0x2b312a)]);_0x4150c8[_0x3b8d8b(0x336)][_0x3b8d8b(0x1e9)](0x0,0x0,_0x1feac2,_0x5c38ab,_0x3f8080),_0x1feac2-=0x2,_0x5c38ab-=0x2,_0x4150c8[_0x3b8d8b(0x336)]['fillRect'](0x1,0x1,_0x1feac2,_0x5c38ab,_0x308ece),_0x1feac2-=_0x596e64*0x2,_0x5c38ab-=_0x596e64*0x2,_0x4150c8[_0x3b8d8b(0x336)][_0x3b8d8b(0x1e9)](0x1+_0x596e64,0x1+_0x596e64,_0x1feac2,_0x5c38ab,_0x3f8080),_0x1feac2-=0x2,_0x5c38ab-=0x2,_0x596e64+=0x1,_0x4150c8[_0x3b8d8b(0x336)][_0x3b8d8b(0x1cc)](0x1+_0x596e64,0x1+_0x596e64,_0x1feac2,_0x5c38ab);}this[_0x3b8d8b(0x216)]=_0x4150c8,this[_0x3b8d8b(0x282)](this['_backgroundSprite']);},Sprite_OTB_TurnOrder_Battler['prototype']['getBorderThickness']=function(){const _0x49559f=_0x205e7a,_0x2a7756=Window_OTB_TurnOrder['Settings'];return _0x2a7756[_0x49559f(0x2fa)];},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['createLetterSprite']=function(){const _0x8abff7=_0x205e7a,_0x154356=Window_OTB_TurnOrder['Settings'];if(!_0x154356[_0x8abff7(0x285)])return;if(this['_unit']===$gameParty)return;const _0x50c5a8=this[_0x8abff7(0x211)](),_0x1bdb8d=this['bitmapHeight'](),_0x33a0d8=new Sprite();_0x33a0d8['anchor']['x']=this['anchor']['x'],_0x33a0d8['anchor']['y']=this[_0x8abff7(0x195)]['y'],_0x33a0d8['bitmap']=new Bitmap(_0x50c5a8,_0x1bdb8d),this[_0x8abff7(0x1f0)]=_0x33a0d8,this[_0x8abff7(0x282)](this[_0x8abff7(0x1f0)]);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['battler']=function(){const _0x2e959b=_0x205e7a;return this['_unit']?this[_0x2e959b(0x279)][_0x2e959b(0x28d)]()[this[_0x2e959b(0x202)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x138)]=function(){const _0x27c968=_0x205e7a;Sprite_Clickable[_0x27c968(0x1a4)][_0x27c968(0x138)][_0x27c968(0x1e2)](this),this[_0x27c968(0x303)](),this['checkOpacity'](),this['updateOpacity'](),this[_0x27c968(0x25d)](),this['updateGraphicHue'](),this[_0x27c968(0x273)](),this[_0x27c968(0x209)]();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x20d)]=function(_0x550773,_0x433aab){const _0x2e5845=_0x205e7a,_0x4d1b3c=Window_OTB_TurnOrder[_0x2e5845(0x18b)];this[_0x2e5845(0x333)]=_0x4d1b3c['UpdateFrames'],this[_0x2e5845(0x2e4)]=_0x550773,this[_0x2e5845(0x191)]=_0x433aab;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x303)]=function(){const _0x375a99=_0x205e7a;if(this['_positionDuration']>0x0){const _0x3298d1=this[_0x375a99(0x333)];this['x']=(this['x']*(_0x3298d1-0x1)+this['_positionTargetX'])/_0x3298d1,this['y']=(this['y']*(_0x3298d1-0x1)+this['_positionTargetY'])/_0x3298d1,this[_0x375a99(0x333)]--;}if(this[_0x375a99(0x333)]<=0x0){this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];if(this['opacity']<0xff&&!this[_0x375a99(0x1d4)]&&this[_0x375a99(0x2ea)]<=0x0){const _0x364f6a=this['battler']();_0x364f6a&&(this['_fadeTarget']=_0x364f6a[_0x375a99(0x2c5)]()&&_0x364f6a[_0x375a99(0x2eb)]()?0xff:0x0);}}},Sprite_OTB_TurnOrder_Battler['prototype']['defaultPosition']=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x254)]=function(){const _0x170589=_0x205e7a;return SceneManager[_0x170589(0x26e)][_0x170589(0x22a)];},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x157)]=function(){const _0x5d345b=_0x205e7a,_0x2e591e=this[_0x5d345b(0x21c)]();if(!_0x2e591e)return this[_0x5d345b(0x2d1)]();if(_0x2e591e===BattleManager[_0x5d345b(0x30d)])return 0x0;if(BattleManager[_0x5d345b(0x1e7)][_0x5d345b(0x221)](_0x2e591e)){const _0x569f99=BattleManager['_actionBattlers'][_0x5d345b(0x122)](_0x2e591e)+0x1;return _0x569f99;}return this[_0x5d345b(0x2d1)]();},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['startFade']=function(_0x2d30f8){const _0x17a02a=_0x205e7a,_0x41eeff=Window_OTB_TurnOrder[_0x17a02a(0x18b)];this[_0x17a02a(0x2ea)]=_0x41eeff[_0x17a02a(0x2e8)],this[_0x17a02a(0x1f5)]=_0x2d30f8;},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['checkOpacity']=function(){const _0x2622a4=_0x205e7a,_0x40767f=this[_0x2622a4(0x21c)]();if(!_0x40767f)return;if(this['_isAlive']===_0x40767f[_0x2622a4(0x2c5)]()&&this['_isAppeared']===_0x40767f[_0x2622a4(0x2eb)]())return;this['_isAlive']=_0x40767f['isAlive'](),this[_0x2622a4(0x1cf)]=_0x40767f['isAppeared']();let _0x5192c8=this['_isAlive']&&this[_0x2622a4(0x1cf)]?0xff:0x0;this[_0x2622a4(0x114)](_0x5192c8);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x32e)]=function(){const _0x401d7d=_0x205e7a;if(this[_0x401d7d(0x2ea)]>0x0){const _0xf8b68c=this[_0x401d7d(0x2ea)];this[_0x401d7d(0x1b5)]=(this[_0x401d7d(0x1b5)]*(_0xf8b68c-0x1)+this[_0x401d7d(0x1f5)])/_0xf8b68c,this[_0x401d7d(0x2ea)]--,this[_0x401d7d(0x2ea)]<=0x0&&(this[_0x401d7d(0x1b5)]=this[_0x401d7d(0x1f5)]);}if(this[_0x401d7d(0x1d4)])return;BattleManager[_0x401d7d(0x17f)]==='battleEnd'&&(this[_0x401d7d(0x1d4)]=!![],this[_0x401d7d(0x114)](0x0));},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x25d)]=function(){const _0x1afbff=_0x205e7a,_0x3216f9=this[_0x1afbff(0x21c)]();if(!_0x3216f9)return;const _0x5a827d=Window_OTB_TurnOrder[_0x1afbff(0x18b)],_0x3792ce=this['_unit']===$gameParty?_0x1afbff(0x169):_0x1afbff(0x1e4);let _0xc0dfe6=_0x3216f9[_0x1afbff(0x2b0)]();if(_0x3216f9[_0x1afbff(0x2b7)]()&&_0xc0dfe6==='enemy')_0xc0dfe6=_0x1afbff(0x1e8);else _0x3216f9[_0x1afbff(0x1af)]()&&_0xc0dfe6===_0x1afbff(0x2a2)&&(_0xc0dfe6=_0x1afbff(0x32a));if(this[_0x1afbff(0x308)]!==_0xc0dfe6)return this[_0x1afbff(0x2f3)]();switch(this[_0x1afbff(0x308)]){case _0x1afbff(0x1e8):if(this[_0x1afbff(0x259)]!==_0x3216f9[_0x1afbff(0x245)]())return this['processUpdateGraphic']();if(this[_0x1afbff(0x32d)]!==_0x3216f9[_0x1afbff(0x19f)]())return this[_0x1afbff(0x2f3)]();break;case _0x1afbff(0x327):if(this[_0x1afbff(0x2aa)]!==_0x3216f9[_0x1afbff(0x113)]())return this[_0x1afbff(0x2f3)]();break;case _0x1afbff(0x32a):if(_0x3216f9[_0x1afbff(0x15d)]()){if(this[_0x1afbff(0x29b)]!==_0x3216f9[_0x1afbff(0x21b)]())return this[_0x1afbff(0x2f3)]();}else{if(this[_0x1afbff(0x11f)]!==_0x3216f9['battlerName']())return this['processUpdateGraphic']();}break;case _0x1afbff(0x2a2):if(_0x3216f9[_0x1afbff(0x2b7)]()){if(this['_graphicSv']!==_0x3216f9[_0x1afbff(0x326)]())return this[_0x1afbff(0x2f3)]();}else{if(this[_0x1afbff(0x11f)]!==_0x3216f9[_0x1afbff(0x326)]())return this[_0x1afbff(0x2f3)]();}break;}},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2f3)]=function(){const _0x2161a2=_0x205e7a,_0x49703b=this[_0x2161a2(0x21c)]();if(!_0x49703b)return;this[_0x2161a2(0x308)]=_0x49703b[_0x2161a2(0x2b0)]();if(_0x49703b[_0x2161a2(0x2b7)]()&&this['_graphicType']===_0x2161a2(0x32a))this[_0x2161a2(0x308)]='face';else _0x49703b[_0x2161a2(0x1af)]()&&this[_0x2161a2(0x308)]==='svactor'&&(this[_0x2161a2(0x308)]='enemy');let _0x29820d;switch(this[_0x2161a2(0x308)]){case _0x2161a2(0x1e8):this['_graphicFaceName']=_0x49703b['TurnOrderOTBGraphicFaceName'](),this[_0x2161a2(0x32d)]=_0x49703b[_0x2161a2(0x19f)](),_0x29820d=ImageManager['loadFace'](this[_0x2161a2(0x259)]),_0x29820d[_0x2161a2(0x2d0)](this[_0x2161a2(0x196)][_0x2161a2(0x149)](this,_0x29820d));break;case _0x2161a2(0x327):this[_0x2161a2(0x2aa)]=_0x49703b[_0x2161a2(0x1d6)](),_0x29820d=ImageManager['loadSystem']('IconSet'),_0x29820d[_0x2161a2(0x2d0)](this['changeIconGraphicBitmap'][_0x2161a2(0x149)](this,_0x29820d));break;case _0x2161a2(0x32a):if(_0x49703b[_0x2161a2(0x15d)]())this[_0x2161a2(0x29b)]=_0x49703b[_0x2161a2(0x21b)](),_0x29820d=ImageManager['loadSvActor'](this[_0x2161a2(0x29b)]),_0x29820d[_0x2161a2(0x2d0)](this[_0x2161a2(0x208)][_0x2161a2(0x149)](this,_0x29820d));else $gameSystem[_0x2161a2(0x304)]()?(this[_0x2161a2(0x11f)]=_0x49703b[_0x2161a2(0x326)](),_0x29820d=ImageManager[_0x2161a2(0x27c)](this[_0x2161a2(0x11f)]),_0x29820d[_0x2161a2(0x2d0)](this[_0x2161a2(0x314)][_0x2161a2(0x149)](this,_0x29820d))):(this[_0x2161a2(0x11f)]=_0x49703b['battlerName'](),_0x29820d=ImageManager['loadEnemy'](this[_0x2161a2(0x11f)]),_0x29820d[_0x2161a2(0x2d0)](this[_0x2161a2(0x314)][_0x2161a2(0x149)](this,_0x29820d)));break;case _0x2161a2(0x2a2):this[_0x2161a2(0x29b)]=_0x49703b['battlerName'](),_0x29820d=ImageManager['loadSvActor'](this[_0x2161a2(0x29b)]),_0x29820d[_0x2161a2(0x2d0)](this[_0x2161a2(0x208)][_0x2161a2(0x149)](this,_0x29820d));break;}},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['changeFaceGraphicBitmap']=function(_0x18c2cf){const _0x6a0e35=_0x205e7a,_0x3ac3b8=this[_0x6a0e35(0x32d)],_0x58718d=this[_0x6a0e35(0x211)](),_0xd08697=this[_0x6a0e35(0x15a)](),_0x33a928=Math['max'](_0x58718d,_0xd08697);this[_0x6a0e35(0x15e)][_0x6a0e35(0x336)]=new Bitmap(_0x58718d,_0xd08697);const _0x1a1c1b=this[_0x6a0e35(0x15e)][_0x6a0e35(0x336)],_0x59a936=ImageManager[_0x6a0e35(0x2b4)],_0x24f889=ImageManager['faceHeight'],_0x25071a=_0x33a928/Math[_0x6a0e35(0x1fa)](_0x59a936,_0x24f889),_0x15f530=ImageManager[_0x6a0e35(0x2b4)],_0x2f9cb6=ImageManager[_0x6a0e35(0x181)],_0x4493cb=_0x3ac3b8%0x4*_0x59a936+(_0x59a936-_0x15f530)/0x2,_0x1379a5=Math['floor'](_0x3ac3b8/0x4)*_0x24f889+(_0x24f889-_0x2f9cb6)/0x2,_0x4c4193=(_0x58718d-_0x59a936*_0x25071a)/0x2,_0xa0151d=(_0xd08697-_0x24f889*_0x25071a)/0x2;_0x1a1c1b[_0x6a0e35(0x2a8)](_0x18c2cf,_0x4493cb,_0x1379a5,_0x15f530,_0x2f9cb6,_0x4c4193,_0xa0151d,_0x33a928,_0x33a928);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x319)]=function(_0x292271){const _0x5485c4=_0x205e7a,_0x14c466=this['_graphicIconIndex'],_0x593dcd=this[_0x5485c4(0x211)](),_0x59dd42=this[_0x5485c4(0x15a)]();this[_0x5485c4(0x15e)][_0x5485c4(0x336)]=new Bitmap(_0x593dcd,_0x59dd42);const _0x3ef1e4=this[_0x5485c4(0x15e)][_0x5485c4(0x336)],_0x4ab118=ImageManager['iconWidth'],_0x734459=ImageManager[_0x5485c4(0x2c3)],_0x5ddbbd=Math[_0x5485c4(0x2dc)](_0x4ab118,_0x734459,_0x593dcd,_0x59dd42),_0x42f4de=_0x14c466%0x10*_0x4ab118,_0x132b36=Math[_0x5485c4(0x154)](_0x14c466/0x10)*_0x734459,_0x3e6133=Math['floor'](Math[_0x5485c4(0x1fa)](_0x593dcd-_0x5ddbbd,0x0)/0x2),_0x49921f=Math[_0x5485c4(0x154)](Math[_0x5485c4(0x1fa)](_0x59dd42-_0x5ddbbd,0x0)/0x2);_0x3ef1e4[_0x5485c4(0x2a8)](_0x292271,_0x42f4de,_0x132b36,_0x4ab118,_0x734459,_0x3e6133,_0x49921f,_0x5ddbbd,_0x5ddbbd);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x208)]=function(_0x41cab3){const _0x23ce58=_0x205e7a,_0x3c506a=this[_0x23ce58(0x211)](),_0x2aeae1=this[_0x23ce58(0x15a)](),_0x49a719=Math[_0x23ce58(0x2dc)](_0x3c506a,_0x2aeae1);this[_0x23ce58(0x15e)][_0x23ce58(0x336)]=new Bitmap(_0x3c506a,_0x2aeae1);const _0x59573e=this[_0x23ce58(0x15e)][_0x23ce58(0x336)],_0x57be1e=this[_0x23ce58(0x29b)][_0x23ce58(0x2b6)](/\$/i),_0x47a34b=_0x57be1e?0x1:ImageManager[_0x23ce58(0x19a)],_0x658dd5=_0x57be1e?0x1:ImageManager[_0x23ce58(0x141)],_0x300128=_0x41cab3[_0x23ce58(0x179)]/_0x47a34b,_0x7d4a0d=_0x41cab3['height']/_0x658dd5,_0x4f8b6e=Math[_0x23ce58(0x2dc)](0x1,_0x49a719/_0x300128,_0x49a719/_0x7d4a0d),_0x560f9c=_0x300128*_0x4f8b6e,_0x4cdc88=_0x7d4a0d*_0x4f8b6e,_0x14f04f=Math[_0x23ce58(0x173)]((_0x3c506a-_0x560f9c)/0x2),_0x198ce9=Math[_0x23ce58(0x173)]((_0x2aeae1-_0x4cdc88)/0x2);_0x59573e[_0x23ce58(0x2a8)](_0x41cab3,0x0,0x0,_0x300128,_0x7d4a0d,_0x14f04f,_0x198ce9,_0x560f9c,_0x4cdc88);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x314)]=function(_0x2fd1c0){const _0x142178=_0x205e7a,_0x4cdd3f=Window_OTB_TurnOrder['Settings'],_0x2fa09a=this[_0x142178(0x211)](),_0x410f3e=this['bitmapHeight'](),_0x156e30=Math['min'](_0x2fa09a,_0x410f3e);this[_0x142178(0x15e)][_0x142178(0x336)]=new Bitmap(_0x2fa09a,_0x410f3e);const _0x441ae6=this[_0x142178(0x15e)][_0x142178(0x336)],_0x2e06d8=Math[_0x142178(0x2dc)](0x1,_0x156e30/_0x2fd1c0[_0x142178(0x179)],_0x156e30/_0x2fd1c0[_0x142178(0x235)]),_0x457cfd=_0x2fd1c0['width']*_0x2e06d8,_0x4a639c=_0x2fd1c0[_0x142178(0x235)]*_0x2e06d8,_0x26e925=Math[_0x142178(0x173)]((_0x2fa09a-_0x457cfd)/0x2),_0x48b288=Math[_0x142178(0x173)]((_0x410f3e-_0x4a639c)/0x2);_0x441ae6['blt'](_0x2fd1c0,0x0,0x0,_0x2fd1c0[_0x142178(0x179)],_0x2fd1c0['height'],_0x26e925,_0x48b288,_0x457cfd,_0x4a639c);},Sprite_OTB_TurnOrder_Battler['prototype']['updateGraphicHue']=function(){const _0x4aebc3=_0x205e7a,_0x4169af=this[_0x4aebc3(0x21c)]();if(!_0x4169af)return;if(!_0x4169af[_0x4aebc3(0x1af)]())return;if(this[_0x4aebc3(0x183)]===_0x4169af['battlerHue']())return;this[_0x4aebc3(0x183)]=_0x4169af[_0x4aebc3(0x143)](),this[_0x4aebc3(0x15e)]['setHue'](_0x4169af['hasSvBattler']()?0x0:this['_graphicHue']);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x273)]=function(){const _0x5c562c=_0x205e7a;if(!this['_letterSprite'])return;const _0x30a9ca=this['battler']();if(!_0x30a9ca)return;if(this[_0x5c562c(0x206)]===_0x30a9ca[_0x5c562c(0x206)]&&this[_0x5c562c(0x2e7)]===_0x30a9ca[_0x5c562c(0x2e7)])return;this[_0x5c562c(0x206)]=_0x30a9ca['_letter'],this['_plural']=_0x30a9ca['_plural'];const _0x25c59d=Window_OTB_TurnOrder[_0x5c562c(0x18b)],_0x41f04e=this['bitmapWidth'](),_0x1299d6=this['bitmapHeight'](),_0x39df2b=this[_0x5c562c(0x1f0)][_0x5c562c(0x336)];_0x39df2b[_0x5c562c(0x2ee)]();if(!this[_0x5c562c(0x2e7)])return;_0x39df2b['fontFace']=_0x25c59d[_0x5c562c(0x18d)]||$gameSystem[_0x5c562c(0x275)](),_0x39df2b[_0x5c562c(0x23f)]=_0x25c59d['EnemyBattlerFontSize']||0x10,_0x25c59d['OrderDirection']?_0x39df2b['drawText'](this[_0x5c562c(0x206)]['trim'](),_0x41f04e*0x1/0x8,_0x1299d6/0x2,_0x41f04e,_0x1299d6/0x2,_0x5c562c(0x286)):_0x39df2b['drawText'](this['_letter'][_0x5c562c(0x262)](),0x0,_0x1299d6/0x2,_0x41f04e*0x7/0x8,_0x1299d6/0x2,_0x5c562c(0x21e));},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x209)]=function(){const _0x4a8a77=_0x205e7a,_0x5831dc=this[_0x4a8a77(0x21c)]();if(!_0x5831dc)return;const _0x5ea79a=_0x5831dc[_0x4a8a77(0x21c)]();if(!_0x5ea79a)return;const _0x18708c=_0x5ea79a[_0x4a8a77(0x11c)]();if(!_0x18708c)return;this[_0x4a8a77(0x243)](_0x18708c[_0x4a8a77(0x2ab)]);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['getStateTooltipBattler']=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)]['changeSourceArray']=function(_0x40463a){const _0x2a0617=_0x205e7a;this['_sourceArray']=_0x40463a,this[_0x2a0617(0x147)](),this[_0x2a0617(0x1b6)]===null&&(this[_0x2a0617(0x1e0)]=-0x1);},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x147)]=function(){const _0x5a68aa=_0x205e7a,_0x32fb7f=this[_0x5a68aa(0x254)]();if(!_0x32fb7f)return;const _0x3fd574=Window_OTB_TurnOrder[_0x5a68aa(0x18b)],_0x51a634=_0x3fd574[_0x5a68aa(0x322)],_0x21a049=this['_sourceArray']===_0x32fb7f[_0x5a68aa(0x2b9)]?!![]:![],_0x11ef68=this[_0x5a68aa(0x1e0)]===-0x1&&BattleManager[_0x5a68aa(0x30d)]===this[_0x5a68aa(0x21c)](),_0x22ee1e=_0x32fb7f['_spriteGroupWidth']-_0x3fd574[_0x5a68aa(0x1a5)];let _0x672032=Math['ceil'](_0x22ee1e/(this[_0x5a68aa(0x1b6)][_0x5a68aa(0x20a)]-0x1||0x1));_0x672032=Math[_0x5a68aa(0x2dc)](_0x3fd574[_0x5a68aa(0x1a5)],_0x672032);let _0x2c0db9=0x0,_0x12ef5c=0x0,_0x3b7a3e=_0x11ef68?-0x1:this[_0x5a68aa(0x1b6)]['indexOf'](this);!_0x11ef68&&(_0x3b7a3e=this[_0x5a68aa(0x2cc)]());if(_0x11ef68)_0x2c0db9=_0x32fb7f['_subjectX'];else _0x51a634?(_0x2c0db9=(_0x21a049?_0x32fb7f['_nextX']:_0x32fb7f['_currentX'])+_0x22ee1e,_0x2c0db9-=_0x3b7a3e*_0x672032):(_0x2c0db9=_0x21a049?_0x32fb7f['_nextX']:_0x32fb7f[_0x5a68aa(0x1c6)],_0x2c0db9+=_0x3b7a3e*_0x672032);_0x2c0db9+=this[_0x5a68aa(0x231)](_0x3b7a3e,_0x3fd574[_0x5a68aa(0x1a5)]-_0x672032),!_0x11ef68&&_0x3b7a3e<0x0&&(_0x2c0db9=this['x'],_0x12ef5c=this['y'],this['startFade'](0x0)),this[_0x5a68aa(0x20d)](_0x2c0db9,_0x12ef5c);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x205e7a(0x231)]=function(_0xaf9ae6,_0x1f1b38){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x205e7a(0x1a4)][_0x205e7a(0x2cc)]=function(){const _0x1fa7a2=_0x205e7a,_0x208a84=this[_0x1fa7a2(0x254)]();if(!_0x208a84)return 0x0;const _0x2a7d72=this['_sourceArray']===_0x208a84[_0x1fa7a2(0x2b9)]?!![]:![],_0x1216e1=_0x2a7d72?BattleManager[_0x1fa7a2(0x1d0)]:BattleManager[_0x1fa7a2(0x1e7)],_0x357440=this['battler'](),_0x26feac=VisuMZ[_0x1fa7a2(0x10e)]['GetAllIndicies'](_0x357440,_0x1216e1);return _0x26feac[this[_0x1fa7a2(0x1e0)]]??_0x26feac[_0x26feac['length']-0x1]??-0x1;};function _0x150e(){const _0x33c5c9=['EnemyBattlerFaceName','svactor','finishActorInput','_lastTargetIndex','center','sortContainer','PreviewOffsetY','blt','createBackgroundSprite','_graphicIconIndex','_blendColor','Actors','ARRAYFUNC','_bgImageSprite','PreviewEnemy','TurnOrderOTBGraphicType','makeSpeed','isBattleItemWindowOTB','Game_Battler_makeActionTimes','faceWidth','applyGlobalBattleSystemOTB','match','isActor','_otbTurnOrderVisible','_nextTurn','removeState','startTurn','initialize','ConvertAgiDebuffCurrent','Scene_Battle_createAllWindows','deathStateId','OtbTurnOrderClearEnemyGraphic','visible','addState','iconHeight','initHomePositions','isAlive','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','transparent','12thlLaL','Scene_Battle_onItemCancel','contentsBack','_hidden','calculateTargetIndex','FaceIndex','makeOTBSpeed','setBattleSystemOTBTurnOrderVisible','addLoadListener','defaultPosition','Game_Actor_selectNextCommand','MoveDistance','endAction','_actorCommandWindow','children','%1BgColor1','otbCalcUserNextOrderChange','applyItemAddedActionOTB','TargetAddActionNext','initMembersOTB','min','ActorBattlerType','splice','Scene_Battle_onEnemyCancel','recoverAll','GetAllIndicies','constructor','setGuard','_positionTargetX','%1BgColor2','removeSprite','_plural','UpdateFrames','ARRAYSTRUCT','_fadeDuration','isAppeared','EnemyBattlerType','_currentTurn','clear','otbAddActions','remove','createTurnOrderSprites','LogWindowOffsetY','processUpdateGraphic','shiftNextTurnSpritesToCurrentTurn','item','format','BattleManager_isTurnBased','UiAlignment','UiFontSize','BorderThickness','createTurnOrderOTBGraphicType','actor','createAllWindows','createOrderPreview','commandCancel','OTB_STUN_INFINITY_CLAMP','FaceName','return\x200','updatePosition','isSideView','_previewNext','singleSkill','contents','_graphicType','version','_logWindow','UserFollOrder','_handlers','_subject','allowRandomSpeed','UiCurrentText','EFFECT_ADD_DEBUFF','SubjectDistance','addActor','_requestTurnOrderUpdate','changeEnemyGraphicBitmap','Window_Help_setItem','setSkill','setup','UserCurrOrder','changeIconGraphicBitmap','endTurn','_homeDuration','otbAddBattlerToTurnOrderAtEnd','Scene_Battle_commandAttack','isOTB','otbCalcUserCurrentOrderChange','_otbTurnOrderGraphicType','contentsOpacity','OrderDirection','Enemies','onBattleStartOTB','top','battlerName','icon','BattleManager_setup','ceil','enemy','BattleManager_forceAction','Game_Party_addActor','_graphicFaceIndex','updateOpacity','makeActionOrdersOTB','createGraphicSprite','Scene_Battle_actorCommandSingleSkill','PreviewScale','_positionDuration','JSON','startInput','bitmap','randomInt','canMove','allBattleMembers','TargetFollOrder','SideviewBattleUI','5471128ftcHpI','refreshTurnOrder','appear','BattleManager_isTpb','_last_otb_actionPlusSetLength','addForceActionBattler','onTurnEnd','dimColor2','faceName','UiSubjectText','BattleSystemOTB','Mechanics','Scene_Battle_onEnemyOk','clearTurnOrderOTBGraphics','speed','TurnOrderOTBGraphicIconIndex','startFade','SystemTurnOrderVisibility','ScreenBuffer','refresh','createNewTurnOrderSprites','EnemyBattlerIcon','startActorInput','startInputOTB','mainSprite','Game_Action_speed','active','_graphicEnemy','applyItemUserEffect','_homeX','indexOf','guard','_otbTimesActedThisTurn','_spriteGroupWidth','_homeY','7868984wYTwDJ','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','NUM','_actorWindow','updateStateTurns','otbShiftTurnOrderForSubject','RegExp','makeActionTimes','effects','image','map','initBattleSystemOTB','RandomizeActionTimesOrder','createLetterSprite','BgImageFilename','exit','_spriteContainer','update','otbCreateNewTurnOrderSprites','ShowMarkerBg','filter','removeActionBattlersOTB','faceIndex','gradientFillRect','postEndActionOTB','_surprise','svActorVertCells','createTurnOrderOTBGraphicFaceIndex','battlerHue','getBorderThickness','onActorOk','Game_BattlerBase_appear','calculateTargetPositions','TurnOrder','bind','onTurnEndOTB','_containerWidth','Game_Battler_onBattleEnd','isNextOtbSubject','otbAddForceActionBattler','adjustForPreview','Scene_Battle_onItemOk','_offset','commandFight','Game_Battler_makeSpeed','floor','removeUnableTurnOrderSprites','updateTurnOrders','containerPosition','toUpperCase','numActions','bitmapHeight','battleEnd','isUsingSideviewUiLayout','hasSvBattler','_graphicSprite','Game_Battler_onTurnEnd','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','BattleManager_endAction','otbPreviewOrderClear','initMembers','STRUCT','PreviewOffsetX','requestUpdateTurnOrders','PostStunInfinitySpeed','BattleManager_endTurn','Actor','otbProcessActionCheck','DisplayOffsetY','InitialSpeedJS','ARRAYSTR','onItemCancel','stepForward','BgImageOffsetX','otbApplyActionTimes','createChildren','round','_otbTurnOrderFaceName','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','Game_BattlerBase_recoverAll','bottom','push','width','Game_BattlerBase_hide','applyItemTargetEffectOTB','521963EvPYOd','inputtingAction','attack','_phase','processTurnOTB','faceHeight','_targetHomeY','_graphicHue','TargetAddActionCurrent','3429244aAkjYN','InfinityClamp','ConvertParams','BgDimStyle','Game_Battler_forceAction','subject','Settings','clearMakeActionTimesCacheOTB','EnemyBattlerFontFace','endBattlerActions','getInfinityClamp','TargetCurrOrder','_positionTargetY','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','shift','BattleManager_processTurn','anchor','changeFaceGraphicBitmap','unshift','loadSystem','Scene_Battle_commandGuard','svActorHorzCells','getChildIndex','pop','create','previewOrderByAction','TurnOrderOTBGraphicFaceIndex','onBattleEndOTB','UiSubjectOffsetY','makeNextActionOrdersOTB','otbRemoveCurrentSubject','prototype','SpriteThin','isStateAffected','Game_System_initialize','_nextX','random','processTurn','Scene_Battle_commandCancel','OtbTurnOrderClearActorGraphic','2EhTCSy','ConvertAgiBuffCurrent','isEnemy','Scene_Battle_onSkillCancel','%1BorderColor','Scene_Battle_createActorCommandWindow','UiCurrentOffsetX','createActorCommandWindowOTB','opacity','_sourceArray','isPreviousSceneBattleTransitionable','isHorz','OtbTurnOrderActorIcon','_windowLayer','5374386SNvbhL','battleMembers','DisplayPosition','SpriteLength','_tempActor','RepositionTopHelpX','applyBattleItemWindowOTB','addBattlerToTurnOrderAtStart','turnOrderChangeOTB','UiCurrentOffsetY','onItemOk','_currentX','_ogWindowLayerY','Game_Action_applyItemUserEffect','ARRAYEVAL','drawBgImage','FUNC','clearRect','ConvertSpeedJS','removeChild','_isAppeared','_otb_actionBattlersNext','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_tempBattler','ActionBattlersNextFilter','_isBattleOver','getColor','createTurnOrderOTBGraphicIconIndex','commandAttack','otbPreviewOrderChange','selectNextCommand','onEnemyOk','createSpriteContainers','parameters','_forceAction','onEnemyCancel','OTB_CONVERT_AGI_BUFF_NEXT_TURN','_instance','onActorCancel','call','_isAlive','Enemy','Scene_Battle_onSkillOk','OTB_ADDED_ACTION_TIMES','_actionBattlers','face','fillRect','AllowRandomSpeed','scale','RepositionTopHelpY','Game_Party_removeActor','_actions','OtbTurnOrderEnemyFace','_letterSprite','code','status','shiftTurnOrderForSubject','canChangeOtbTurnOrder','_fadeTarget','addChildAt','removeCurrentSubject','30DTRyOX','name','max','StatusWindow','preEndActionOTB','EFFECT_ADD_BUFF','battleSys','BattleManager_finishActorInput','Conversion','otbReturnBattlerToTurnOrders','_index','createInitialPositions','%1-%2','currentAction','_letter','commandGuard','changeSvActorGraphicBitmap','updateSelectionEffect','length','commandCancelOTB','currentExt','moveToPosition','onBattleEnd','setOTBGraphicIconIndex','ActionBattlersFilter','bitmapWidth','isActiveTpb','_subjectX','_speed','otbCalcTargetNextOrderChange','_backgroundSprite','clearOrderPreview','index','changeSourceArray','BattleManager_makeActionOrders','svBattlerName','battler','BattleManager_battleSys','right','sort','BattleManager_isActiveTpb','includes','removeActor','BattleManager_selectNextActor','updateVisibility','EnableActionTimes','drawText','Scene_Battle_onActorOk','ShowMarkerBorder','_otbTurnOrderFaceIndex','_otbTurnOrderWindow','cancel','EVAL','getStateIdWithName','Game_Battler_addState','Scene_Battle_onActorCancel','_fadeSpeed','additionalTargetXAdjustments','findIndex','_previewCurrent','canInput','height','otbCalcTargetCurrentOrderChange','dataId','_inputting','actionPlusSet','addBattlerToTurnOrderAtEnd','_stateIDs','_otb_createdFirstTurnOrders','applyGlobal','_statusWindow','fontSize','onSkillCancel','onBattleStart','createTurnOrderOTBGraphicFaceName','setBlendColor','Game_Battler_onBattleStart','TurnOrderOTBGraphicFaceName','padding','registerCommand','RepositionLogWindow','gradient','processSpriteRemoval','note','UiNextText','getUnitSideSide','isTurnBased','drawUiText','_targetHomeX','UiNextOffsetY','select','isBattleSystemOTBTurnOrderVisible','containerWindow','1982655VmNHJc','ARRAYNUM','drawDimmedArea','%1SystemBorder','_graphicFaceName','otbGainInstant','OTB_STUN_INFINITY_SPEED','onSkillOk','updateGraphic','Game_Battler_removeState','ConvertAgiDebuffNext','EnemyBattlerFaceIndex','selectNextActor','trim','IconIndex','isBattleMember','OtbTurnOrderEnemyIcon','createActorCommandWindow','isTpb','createBorderSprite','decideRandomTarget','1983495NqRTEM','repositionLogWindowOTB','_partyCommandWindow','isSceneBattle','_scene','isPartyCommandWindowDisabled','actorCommandSingleSkill','otbUnshiftBattlerToTurnOrders','getNextSubject','updateLetter','forceAction','mainFontFace','resumeTurnOrderSprites','otbRemoveUnableTurnOrderSprites','setTarget','_unit','removeStatesAuto','parse','loadSvEnemy','isInfinitySpeedOTB','_currentActor','clamp','_otbTurnOrderIconIndex','makeActionTimesOTB','addChild','selectNextActorOTB','setItem','EnemyBattlerDrawLetter','left','needsSelection','description','performActionEndOTB','makeActionOrders','Game_Action_allowRandomSpeed','_helpWindow','members','dimColor1','_ogWindowLayerX','boxHeight','forceActionOTB','windowRect','OTB','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','otbAddBattlerToTurnOrderAtStart','_cache_makeActionTimesOTB','makeDeepCopy','makeActions','createOrderPreviewSprite','_previewContainer','_graphicSv','BattleManager_startInput','resetFontSettings','hide','Game_Action_applyGlobal','getBattleSystem'];_0x150e=function(){return _0x33c5c9;};return _0x150e();}function _0x4fd4(_0x4bba22,_0x4ff360){const _0x150e00=_0x150e();return _0x4fd4=function(_0x4fd4e6,_0x2cb02e){_0x4fd4e6=_0x4fd4e6-0x100;let _0x5cc5d2=_0x150e00[_0x4fd4e6];return _0x5cc5d2;},_0x4fd4(_0x4bba22,_0x4ff360);}function Sprite_OTB_TurnOrder_Preview(){const _0x39b7fb=_0x205e7a;this[_0x39b7fb(0x2bc)](...arguments);}Sprite_OTB_TurnOrder_Preview['prototype']=Object[_0x205e7a(0x19d)](Sprite_OTB_TurnOrder_Battler['prototype']),Sprite_OTB_TurnOrder_Preview['prototype'][_0x205e7a(0x2e2)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x2bc)]=function(_0x42382e,_0x338624,_0x4c64c1,_0x3af321){const _0x506122=_0x205e7a;this[_0x506122(0x151)]=_0x3af321,Sprite_OTB_TurnOrder_Battler[_0x506122(0x1a4)][_0x506122(0x2bc)][_0x506122(0x1e2)](this,_0x42382e,_0x338624,_0x4c64c1),this[_0x506122(0x14f)]();},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x14f)]=function(){const _0x1dcf07=_0x205e7a,_0x4cdc61=Window_OTB_TurnOrder[_0x1dcf07(0x18b)];this[_0x1dcf07(0x1eb)]['x']=this['scale']['y']=_0x4cdc61['PreviewScale'];},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x24d)]=function(){const _0x282a81=_0x205e7a;return this[_0x282a81(0x279)]===$gameParty?'PreviewActor':_0x282a81(0x2af);},Sprite_OTB_TurnOrder_Preview['prototype'][_0x205e7a(0x144)]=function(){const _0x46aee5=_0x205e7a,_0xfa6815=Window_OTB_TurnOrder[_0x46aee5(0x18b)];return Math[_0x46aee5(0x329)](_0xfa6815[_0x46aee5(0x2fa)]/(_0xfa6815[_0x46aee5(0x332)]||0.01));},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x20d)]=function(_0x2652d9,_0x298628){const _0x1f2cd5=_0x205e7a;Sprite_OTB_TurnOrder_Battler['prototype']['moveToPosition'][_0x1f2cd5(0x1e2)](this,_0x2652d9,_0x298628),this['x']=this[_0x1f2cd5(0x2e4)],this['y']=this['_positionTargetY'];},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x114)]=function(_0x1d78a2){const _0x365761=_0x205e7a;Sprite_OTB_TurnOrder_Battler[_0x365761(0x1a4)][_0x365761(0x114)][_0x365761(0x1e2)](this,_0x1d78a2),_0x1d78a2>0x0?this['_fadeDuration']=0x1:(this[_0x365761(0x2ea)]/=0x2,this['_fadeDuration']=Math['floor'](this[_0x365761(0x2ea)]));},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x231)]=function(_0x4aa328,_0x1eaabc){const _0xb62a39=_0x205e7a,_0x224745=Window_OTB_TurnOrder[_0xb62a39(0x18b)];if(_0x4aa328>0x0){if(this[_0xb62a39(0x151)]>0x0)return _0x224745[_0xb62a39(0x322)]?-_0x224745[_0xb62a39(0x1a5)]:_0x224745[_0xb62a39(0x1a5)];else{if(this[_0xb62a39(0x151)]<0x0)return _0x224745['OrderDirection']?-_0x1eaabc:_0x1eaabc;}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x2cc)]=function(){const _0x11f94b=_0x205e7a,_0x9f1dec=this['containerWindow'](),_0x29855d=this['_sourceArray']===_0x9f1dec[_0x11f94b(0x2b9)]?!![]:![],_0x67667d=_0x29855d?BattleManager['_otb_actionBattlersNext']:BattleManager[_0x11f94b(0x1e7)];let _0x3c7838=0x0,_0x44ca3b=_0x67667d[_0x11f94b(0x20a)]-0x1;_0x29855d&&(_0x3c7838=Math['max'](0x0,VisuMZ[_0x11f94b(0x10e)][_0x11f94b(0x18f)](_0x67667d)));let _0x11a2ac=Sprite_OTB_TurnOrder_Battler['prototype'][_0x11f94b(0x2cc)][_0x11f94b(0x1e2)](this);return _0x11a2ac+=this[_0x11f94b(0x151)],_0x11a2ac[_0x11f94b(0x27f)](_0x3c7838,_0x44ca3b);},Sprite_OTB_TurnOrder_Preview[_0x205e7a(0x1a4)][_0x205e7a(0x209)]=function(){},Window_Selectable[_0x205e7a(0x1a4)][_0x205e7a(0x2b2)]=function(){return![];},VisuMZ['BattleSystemOTB']['Window_Selectable_select']=Window_Selectable[_0x205e7a(0x1a4)]['select'],Window_Selectable[_0x205e7a(0x1a4)][_0x205e7a(0x252)]=function(_0xa70abe){const _0x5025df=_0x205e7a;VisuMZ[_0x5025df(0x10e)]['Window_Selectable_select']['call'](this,_0xa70abe),this[_0x5025df(0x2b2)]()&&this[_0x5025df(0x11e)]&&this[_0x5025df(0x1c1)]();},Window_Selectable['prototype'][_0x205e7a(0x1c1)]=function(){const _0x578ebf=_0x205e7a;BattleManager[_0x578ebf(0x1d8)]();},VisuMZ[_0x205e7a(0x10e)]['Window_Help_setItem']=Window_Help[_0x205e7a(0x1a4)][_0x205e7a(0x284)],Window_Help['prototype'][_0x205e7a(0x284)]=function(_0x1accfe){const _0x260945=_0x205e7a;BattleManager['isOTB']()&&_0x1accfe&&_0x1accfe[_0x260945(0x24b)]&&_0x1accfe[_0x260945(0x24b)]['match'](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ[_0x260945(0x10e)][_0x260945(0x315)]['call'](this,_0x1accfe);},Window_ActorCommand[_0x205e7a(0x1a4)]['isBattleItemWindowOTB']=function(){const _0x38f355=_0x205e7a;return BattleManager[_0x38f355(0x31e)]();},Window_ActorCommand[_0x205e7a(0x1a4)][_0x205e7a(0x1c1)]=function(){const _0x58e40e=_0x205e7a,_0x49710b=BattleManager[_0x58e40e(0x17d)]();if(_0x49710b){const _0x173822=this['currentSymbol']();switch(_0x173822){case _0x58e40e(0x17e):_0x49710b['setAttack']();break;case _0x58e40e(0x123):_0x49710b[_0x58e40e(0x2e3)]();break;case _0x58e40e(0x306):_0x49710b[_0x58e40e(0x316)](this[_0x58e40e(0x20c)]());break;default:_0x49710b[_0x58e40e(0x316)](null);break;}}Window_Command[_0x58e40e(0x1a4)]['applyBattleItemWindowOTB']['call'](this);},Window_BattleSkill[_0x205e7a(0x1a4)]['isBattleItemWindowOTB']=function(){const _0x30cc7c=_0x205e7a;return BattleManager[_0x30cc7c(0x31e)]();},Window_BattleSkill['prototype'][_0x205e7a(0x1c1)]=function(){const _0x828cf0=_0x205e7a,_0x1fdf21=this[_0x828cf0(0x2f5)](),_0x232566=BattleManager[_0x828cf0(0x17d)]();if(_0x232566)_0x232566[_0x828cf0(0x316)](_0x1fdf21?_0x1fdf21['id']:null);Window_SkillList[_0x828cf0(0x1a4)]['applyBattleItemWindowOTB']['call'](this);},Window_BattleItem[_0x205e7a(0x1a4)]['isBattleItemWindowOTB']=function(){return BattleManager['isOTB']();},Window_BattleItem['prototype'][_0x205e7a(0x1c1)]=function(){const _0x594f9c=_0x205e7a,_0x53a3d3=this['item'](),_0x34485f=BattleManager[_0x594f9c(0x17d)]();if(_0x34485f)_0x34485f[_0x594f9c(0x284)](_0x53a3d3?_0x53a3d3['id']:null);Window_ItemList['prototype'][_0x594f9c(0x1c1)][_0x594f9c(0x1e2)](this);},Window_BattleActor['prototype']['isBattleItemWindowOTB']=function(){return BattleManager['isOTB']();},Window_BattleEnemy[_0x205e7a(0x1a4)]['isBattleItemWindowOTB']=function(){const _0x36351f=_0x205e7a;return BattleManager[_0x36351f(0x31e)]();};function Window_OTB_TurnOrder(){const _0x54a8a8=_0x205e7a;this[_0x54a8a8(0x2bc)](...arguments);}Window_OTB_TurnOrder['prototype']=Object['create'](Window_Base[_0x205e7a(0x1a4)]),Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x2e2)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x205e7a(0x18b)]=VisuMZ[_0x205e7a(0x10e)][_0x205e7a(0x18b)][_0x205e7a(0x148)],Window_OTB_TurnOrder[_0x205e7a(0x1a4)]['initialize']=function(){const _0x4cdb81=_0x205e7a,_0x840af6=this[_0x4cdb81(0x292)]();this['initHomePositions'](_0x840af6),Window_Base[_0x4cdb81(0x1a4)]['initialize']['call'](this,_0x840af6),this[_0x4cdb81(0x1b5)]=0x0,this[_0x4cdb81(0x257)](),this[_0x4cdb81(0x24f)](),this[_0x4cdb81(0x1db)](),this[_0x4cdb81(0x224)]();},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x292)]=function(){const _0x5f3ea4=_0x205e7a,_0x40ffe5=Window_OTB_TurnOrder[_0x5f3ea4(0x18b)],_0x2be8bd=SceneManager[_0x5f3ea4(0x26e)][_0x5f3ea4(0x23e)]['height'];let _0x2a523f=Graphics['width']-_0x40ffe5['ScreenBuffer']*0x2,_0x1d00f7=_0x40ffe5[_0x5f3ea4(0x1be)]+this['lineHeight'](),_0x270e35=_0x40ffe5[_0x5f3ea4(0x116)],_0x2d6f13=0x0;switch(_0x40ffe5[_0x5f3ea4(0x1bd)]){case _0x5f3ea4(0x177):_0x2d6f13=Graphics['height']-_0x2be8bd-_0x40ffe5[_0x5f3ea4(0x116)]-_0x1d00f7;break;default:_0x2d6f13=_0x40ffe5[_0x5f3ea4(0x116)];break;}if(Imported['VisuMZ_3_SideviewBattleUI']&&BattleManager[_0x5f3ea4(0x15c)]()){const _0x58acb8=VisuMZ[_0x5f3ea4(0x103)][_0x5f3ea4(0x18b)][_0x5f3ea4(0x1fb)];_0x2a523f-=_0x58acb8['WidthBase']+_0x58acb8[_0x5f3ea4(0x2d3)],_0x2a523f-=_0x40ffe5[_0x5f3ea4(0x116)];}return _0x270e35+=_0x40ffe5['DisplayOffsetX']||0x0,_0x2d6f13+=_0x40ffe5[_0x5f3ea4(0x16b)]||0x0,new Rectangle(_0x270e35,_0x2d6f13,_0x2a523f,_0x1d00f7);},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x2c4)]=function(_0xdb574){const _0x1cf9ac=_0x205e7a;this[_0x1cf9ac(0x250)]=this['_homeX']=_0xdb574['x'],this[_0x1cf9ac(0x182)]=this[_0x1cf9ac(0x126)]=_0xdb574['y'],this[_0x1cf9ac(0x31b)]=0x0;const _0x320893=Window_OTB_TurnOrder['Settings'];this[_0x1cf9ac(0x125)]=Math[_0x1cf9ac(0x329)]((_0xdb574[_0x1cf9ac(0x179)]-_0x320893[_0x1cf9ac(0x1a5)]-_0x320893['SubjectDistance']*0x2)/0x2),_0x320893['OrderDirection']?(this[_0x1cf9ac(0x213)]=_0xdb574[_0x1cf9ac(0x179)]-_0x320893[_0x1cf9ac(0x1a5)],this[_0x1cf9ac(0x1c6)]=this[_0x1cf9ac(0x125)]+_0x320893[_0x1cf9ac(0x311)],this[_0x1cf9ac(0x1a8)]=0x0):(this[_0x1cf9ac(0x213)]=0x0,this[_0x1cf9ac(0x1c6)]=_0x320893[_0x1cf9ac(0x1a5)]+_0x320893['SubjectDistance'],this[_0x1cf9ac(0x1a8)]=this[_0x1cf9ac(0x1c6)]+_0x320893[_0x1cf9ac(0x311)]+this[_0x1cf9ac(0x125)]);},Window_OTB_TurnOrder['prototype']['updatePadding']=function(){const _0x7efc14=_0x205e7a;this[_0x7efc14(0x246)]=0x0;},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x257)]=function(){const _0x59750a=_0x205e7a,_0x4acb86=Window_OTB_TurnOrder[_0x59750a(0x18b)];if(_0x4acb86['BgDimStyle']===_0x59750a(0x2c7))return;if(_0x4acb86[_0x59750a(0x188)]===_0x59750a(0x130)&&_0x4acb86[_0x59750a(0x135)]!==''){const _0x16a46d=ImageManager[_0x59750a(0x198)](_0x4acb86[_0x59750a(0x135)]);_0x16a46d[_0x59750a(0x2d0)](this[_0x59750a(0x1ca)][_0x59750a(0x149)](this,_0x16a46d));return;};const _0x155cb3=this[_0x59750a(0x2ca)],_0x596188=ColorManager[_0x59750a(0x28e)](),_0x101dba=ColorManager[_0x59750a(0x10b)](),_0x573128=this[_0x59750a(0x213)],_0x52bd28=_0x4acb86[_0x59750a(0x1a5)],_0x5cb731=0x0,_0x6a9080=_0x4acb86[_0x59750a(0x1be)],_0x13d003=this[_0x59750a(0x1c6)],_0xa6dc2=this[_0x59750a(0x1a8)],_0x42ab54=this[_0x59750a(0x125)];switch(_0x4acb86['BgDimStyle']){case _0x59750a(0x249):_0x4acb86[_0x59750a(0x322)]?(_0x155cb3[_0x59750a(0x13e)](_0x573128,_0x5cb731,_0x52bd28/0x2,_0x6a9080,_0x101dba,_0x596188,![]),_0x155cb3[_0x59750a(0x1e9)](_0x573128+_0x52bd28/0x2,_0x5cb731,_0x52bd28/0x2,_0x6a9080,_0x596188),_0x155cb3[_0x59750a(0x13e)](_0x13d003,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x101dba,_0x596188,![]),_0x155cb3[_0x59750a(0x1e9)](_0x13d003+_0x42ab54/0x2,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x596188),_0x155cb3[_0x59750a(0x13e)](_0xa6dc2,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x101dba,_0x596188,![]),_0x155cb3['fillRect'](_0xa6dc2+_0x42ab54/0x2,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x596188)):(_0x155cb3['fillRect'](_0x573128,_0x5cb731,_0x52bd28/0x2,_0x6a9080,_0x596188),_0x155cb3[_0x59750a(0x13e)](_0x573128+_0x52bd28/0x2,_0x5cb731,_0x52bd28/0x2,_0x6a9080,_0x596188,_0x101dba,![]),_0x155cb3[_0x59750a(0x1e9)](_0x13d003,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x596188),_0x155cb3[_0x59750a(0x13e)](_0x13d003+_0x42ab54/0x2,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x596188,_0x101dba,![]),_0x155cb3['fillRect'](_0xa6dc2,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x596188),_0x155cb3[_0x59750a(0x13e)](_0xa6dc2+_0x42ab54/0x2,_0x5cb731,_0x42ab54/0x2,_0x6a9080,_0x596188,_0x101dba,![]));break;default:_0x155cb3[_0x59750a(0x1e9)](_0x573128,_0x5cb731,_0x52bd28,_0x6a9080,_0x596188),_0x155cb3['fillRect'](_0x13d003,_0x5cb731,_0x42ab54,_0x6a9080,_0x596188),_0x155cb3[_0x59750a(0x1e9)](_0xa6dc2,_0x5cb731,_0x42ab54,_0x6a9080,_0x596188);break;}},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x1ca)]=function(_0x242563){const _0x1524c2=_0x205e7a;this['_bgImageSprite']=new Sprite(),this[_0x1524c2(0x2ae)][_0x1524c2(0x336)]=_0x242563,this['addChildToBack'](this['_bgImageSprite']);const _0xb31d51=Window_OTB_TurnOrder[_0x1524c2(0x18b)];this['_bgImageSprite']['x']=_0xb31d51[_0x1524c2(0x170)],this['_bgImageSprite']['y']=_0xb31d51['BgImageOffsetY'];},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x24f)]=function(){const _0x475539=_0x205e7a;this[_0x475539(0x307)][_0x475539(0x2ee)](),this[_0x475539(0x29d)]();const _0x2fcc51=Window_OTB_TurnOrder[_0x475539(0x18b)];this[_0x475539(0x307)]['fontSize']=_0x2fcc51[_0x475539(0x2f9)];let _0xfd41b=_0x2fcc51[_0x475539(0x2f8)];_0xfd41b==='auto'&&(_0xfd41b=_0x2fcc51[_0x475539(0x322)]?'right':_0x475539(0x286));let _0x2d6f42=_0x2fcc51['SpriteLength'];if(_0x2fcc51[_0x475539(0x10d)]!==''){const _0x348f87=this['_subjectX']+_0x2fcc51['UiSubjectOffsetX'],_0x4f89d2=_0x2d6f42+_0x2fcc51[_0x475539(0x1a1)],_0x214295=_0x2fcc51[_0x475539(0x1a5)];this[_0x475539(0x226)](_0x2fcc51['UiSubjectText'],_0x348f87,_0x4f89d2,_0x214295,_0x475539(0x2a5));}if(_0x2fcc51[_0x475539(0x30f)]!==''){const _0x229b99=this[_0x475539(0x1c6)]+_0x2fcc51[_0x475539(0x1b3)],_0x492c3a=_0x2d6f42+_0x2fcc51[_0x475539(0x1c4)],_0x1d6fff=this[_0x475539(0x125)];this[_0x475539(0x226)](_0x2fcc51[_0x475539(0x30f)],_0x229b99,_0x492c3a,_0x1d6fff,_0xfd41b);}if(_0x2fcc51[_0x475539(0x24c)]!==''){const _0x39de81=this[_0x475539(0x1a8)]+_0x2fcc51['UiNextOffsetX'],_0x3f1a1e=_0x2d6f42+_0x2fcc51[_0x475539(0x251)],_0x5e2015=this[_0x475539(0x125)];this[_0x475539(0x226)](_0x2fcc51[_0x475539(0x24c)],_0x39de81,_0x3f1a1e,_0x5e2015,_0xfd41b);}},Window_OTB_TurnOrder['prototype']['createSpriteContainers']=function(){const _0x1dd5d1=_0x205e7a,_0x38eef8=Window_OTB_TurnOrder[_0x1dd5d1(0x18b)];this[_0x1dd5d1(0x137)]=new Sprite(),this[_0x1dd5d1(0x282)](this[_0x1dd5d1(0x137)]),this[_0x1dd5d1(0x30d)]=null,this[_0x1dd5d1(0x2ed)]=[],this[_0x1dd5d1(0x2b9)]=[],this['_previewContainer']=new Sprite(),this[_0x1dd5d1(0x29a)]['x']=_0x38eef8[_0x1dd5d1(0x165)],this['_previewContainer']['y']=_0x38eef8[_0x1dd5d1(0x2a7)],this['_previewContainer']['x']-=Math[_0x1dd5d1(0x329)](_0x38eef8[_0x1dd5d1(0x1a5)]*0.5*_0x38eef8['PreviewScale']),_0x38eef8['OrderDirection']&&(this[_0x1dd5d1(0x29a)]['x']+=_0x38eef8[_0x1dd5d1(0x1a5)]),this[_0x1dd5d1(0x29a)]['y']-=Math[_0x1dd5d1(0x329)](_0x38eef8[_0x1dd5d1(0x1be)]*0.5*_0x38eef8[_0x1dd5d1(0x332)]),this[_0x1dd5d1(0x282)](this['_previewContainer']),this[_0x1dd5d1(0x233)]=[],this[_0x1dd5d1(0x305)]=[];},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x138)]=function(){const _0x229fa5=_0x205e7a;Window_Base[_0x229fa5(0x1a4)][_0x229fa5(0x138)][_0x229fa5(0x1e2)](this),this[_0x229fa5(0x156)](),this[_0x229fa5(0x303)](),this[_0x229fa5(0x224)](),this[_0x229fa5(0x2a6)]();},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x166)]=function(){const _0x1742f0=_0x205e7a;this[_0x1742f0(0x313)]=!![];},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x156)]=function(){const _0x3560a9=_0x205e7a;if(!this[_0x3560a9(0x313)])return;this[_0x3560a9(0x313)]=![];for(const _0x532cbb of this[_0x3560a9(0x2ed)]){if(!_0x532cbb)continue;_0x532cbb[_0x3560a9(0x147)]();}for(const _0x4b1c2b of this[_0x3560a9(0x2b9)]){if(!_0x4b1c2b)continue;_0x4b1c2b[_0x3560a9(0x147)]();}},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x303)]=function(){const _0x2bfe11=_0x205e7a,_0x19f74a=Window_OTB_TurnOrder[_0x2bfe11(0x18b)];if(_0x19f74a['DisplayPosition']!==_0x2bfe11(0x325))return;if(!_0x19f74a['RepositionTopForHelp'])return;const _0x2411f5=SceneManager[_0x2bfe11(0x26e)][_0x2bfe11(0x28c)];if(!_0x2411f5)return;_0x2411f5['visible']?(this['x']=this[_0x2bfe11(0x121)]+(_0x19f74a[_0x2bfe11(0x1c0)]||0x0),this['y']=this['_homeY']+(_0x19f74a[_0x2bfe11(0x1ec)]||0x0)):(this['x']=this[_0x2bfe11(0x121)],this['y']=this['_homeY']);const _0x2f9562=SceneManager[_0x2bfe11(0x26e)][_0x2bfe11(0x1ba)];Window_OTB_TurnOrder[_0x2bfe11(0x28f)]===undefined&&(Window_OTB_TurnOrder[_0x2bfe11(0x28f)]=Math['round']((Graphics[_0x2bfe11(0x179)]-Math[_0x2bfe11(0x2dc)](Graphics['boxWidth'],_0x2f9562['width']))/0x2));Window_OTB_TurnOrder[_0x2bfe11(0x1c7)]===undefined&&(Window_OTB_TurnOrder[_0x2bfe11(0x1c7)]=Math[_0x2bfe11(0x173)]((Graphics[_0x2bfe11(0x235)]-Math[_0x2bfe11(0x2dc)](Graphics[_0x2bfe11(0x290)],_0x2f9562[_0x2bfe11(0x235)]))/0x2));;this['x']+=_0x2f9562['x']-Window_OTB_TurnOrder[_0x2bfe11(0x28f)],this['y']+=_0x2f9562['y']-Window_OTB_TurnOrder[_0x2bfe11(0x1c7)];},Window_OTB_TurnOrder[_0x205e7a(0x1a4)]['updateVisibility']=function(){const _0x40d003=_0x205e7a;this[_0x40d003(0x2c1)]=$gameSystem['isBattleSystemOTBTurnOrderVisible']();if(BattleManager[_0x40d003(0x17f)]===_0x40d003(0x15b)){if(!this[_0x40d003(0x230)]){const _0x12eec6=Window_OTB_TurnOrder[_0x40d003(0x18b)];this['_fadeSpeed']=Math['ceil'](0xff/(_0x12eec6[_0x40d003(0x2e8)]||0x1));}this[_0x40d003(0x1b5)]-=this[_0x40d003(0x230)],this[_0x40d003(0x321)]-=this[_0x40d003(0x230)],this['_contentsBackSprite'][_0x40d003(0x1b5)]-=this[_0x40d003(0x230)];}},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x2a6)]=function(){const _0x4b8e11=_0x205e7a;if(!this[_0x4b8e11(0x137)])return;const _0xb19f75=Window_OTB_TurnOrder['Settings'],_0x128cdf=_0xb19f75[_0x4b8e11(0x322)];_0x128cdf?this['_spriteContainer'][_0x4b8e11(0x2d6)][_0x4b8e11(0x21f)]((_0x4f54b5,_0x414d91)=>_0x4f54b5['x']-_0x414d91['x']):this[_0x4b8e11(0x137)][_0x4b8e11(0x2d6)][_0x4b8e11(0x21f)]((_0x41beb0,_0x67f74c)=>_0x67f74c['x']-_0x41beb0['x']);},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x2e6)]=function(_0x45dbfa){const _0x9ac4d0=_0x205e7a;if(!_0x45dbfa)return;_0x45dbfa[_0x9ac4d0(0x1b6)]&&_0x45dbfa[_0x9ac4d0(0x1b6)]['remove'](_0x45dbfa);const _0x136a38=Window_OTB_TurnOrder[_0x9ac4d0(0x18b)],_0x8225b0=0x3e8/0x3c*_0x136a38['UpdateFrames']+0x1f4;_0x45dbfa[_0x9ac4d0(0x114)](0x0),setTimeout(this[_0x9ac4d0(0x24a)][_0x9ac4d0(0x149)](this,_0x45dbfa),_0x8225b0);},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x24a)]=function(_0x466b1c){const _0x3423e0=_0x205e7a;_0x466b1c[_0x3423e0(0x1b6)]&&_0x466b1c[_0x3423e0(0x1b6)][_0x3423e0(0x2f0)](_0x466b1c),this[_0x3423e0(0x137)][_0x3423e0(0x1ce)](_0x466b1c),this[_0x3423e0(0x29a)][_0x3423e0(0x1ce)](_0x466b1c);},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x1f7)]=function(){const _0x105fd4=_0x205e7a;if(!this[_0x105fd4(0x30d)])return;this[_0x105fd4(0x2e6)](this[_0x105fd4(0x30d)]);},Window_OTB_TurnOrder['prototype']['shiftNextTurnSpritesToCurrentTurn']=function(){const _0x439f1f=_0x205e7a;while(this[_0x439f1f(0x2ed)][_0x439f1f(0x20a)]){const _0x89f3b9=this[_0x439f1f(0x2ed)][_0x439f1f(0x193)]();_0x89f3b9['startFade'](0x0);}while(this[_0x439f1f(0x2b9)][_0x439f1f(0x20a)]){const _0x29a9e4=this[_0x439f1f(0x2b9)]['shift']();if(!_0x29a9e4)continue;this[_0x439f1f(0x2ed)][_0x439f1f(0x178)](_0x29a9e4);}for(const _0x1d9c1e of this[_0x439f1f(0x2ed)]){if(!_0x1d9c1e)continue;_0x1d9c1e[_0x439f1f(0x219)](this[_0x439f1f(0x2ed)]);}},Window_OTB_TurnOrder[_0x205e7a(0x1a4)]['createTurnOrderSprites']=function(_0x14556f,_0x58fb25){const _0x404329=_0x205e7a,_0x972119=_0x14556f===BattleManager[_0x404329(0x1e7)]?this[_0x404329(0x2ed)]:this[_0x404329(0x2b9)],_0x4d74ef={};for(const _0x3fcb58 of _0x14556f){const _0x213aa5=_0x404329(0x204)['format'](_0x3fcb58[_0x404329(0x2b7)]()?_0x404329(0x2fc):_0x404329(0x32a),_0x3fcb58['index']());_0x4d74ef[_0x213aa5]=_0x4d74ef[_0x213aa5]||0x0;const _0x1bb761=_0x4d74ef[_0x213aa5]++,_0x51f8ea=new Sprite_OTB_TurnOrder_Battler(_0x3fcb58,_0x1bb761,_0x972119);this[_0x404329(0x137)][_0x404329(0x282)](_0x51f8ea),_0x972119[_0x404329(0x178)](_0x51f8ea);}for(const _0x5cbf67 of _0x972119){if(!_0x5cbf67)continue;_0x5cbf67[_0x404329(0x114)](0xff),_0x5cbf67[_0x404329(0x147)](),_0x58fb25&&(_0x5cbf67[_0x404329(0x1b5)]=0xff,_0x5cbf67['x']=_0x5cbf67['_positionTargetX'],_0x5cbf67[_0x404329(0x333)]=0x0);}},Window_OTB_TurnOrder[_0x205e7a(0x1a4)]['createNewTurnOrderSprites']=function(){const _0x16e487=_0x205e7a,_0x279ae4=BattleManager['_otb_actionBattlersNext'];this[_0x16e487(0x2f1)](_0x279ae4);},Window_OTB_TurnOrder[_0x205e7a(0x1a4)]['shiftTurnOrderForSubject']=function(_0x1da257,_0x105591){const _0xc7c374=_0x205e7a;this[_0xc7c374(0x1f7)]();for(const _0x25b41b of this[_0xc7c374(0x2ed)]){if(!_0x25b41b)continue;_0x25b41b[_0xc7c374(0x21c)]()===_0x1da257&&(_0x25b41b['_instance']=_0x25b41b[_0xc7c374(0x1e0)]||0x0,_0x25b41b[_0xc7c374(0x1e0)]--);}const _0xbe9ecb=this[_0xc7c374(0x2ed)][_0xc7c374(0x232)](_0x37baf7=>_0x37baf7['battler']()===_0x1da257);if(this['_currentTurn'][_0xbe9ecb])this[_0xc7c374(0x30d)]=this['_currentTurn'][_0xbe9ecb],this[_0xc7c374(0x2ed)][_0xbe9ecb][_0xc7c374(0x147)](),this[_0xc7c374(0x2ed)]['splice'](_0xbe9ecb,0x1);else{if(_0x1da257){const _0x4d44ad=new Sprite_OTB_TurnOrder_Battler(_0x1da257,-0x1,null);this[_0xc7c374(0x137)][_0xc7c374(0x282)](_0x4d44ad),this['_subject']=_0x4d44ad,_0x4d44ad[_0xc7c374(0x114)](0xff),_0x4d44ad[_0xc7c374(0x333)]=0x258,_0x4d44ad['x']=this[_0xc7c374(0x213)],_0x4d44ad[_0xc7c374(0x2e4)]=this['_subjectX'],_0x105591&&(_0x4d44ad[_0xc7c374(0x1b5)]=0xff);}}for(const _0x242e3a of this[_0xc7c374(0x2ed)]){if(!_0x242e3a)continue;_0x242e3a[_0xc7c374(0x147)]();}},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x155)]=function(){const _0x1411f2=_0x205e7a;for(const _0x180f65 of this['_currentTurn']){if(!_0x180f65)continue;const _0x5dbbba=_0x180f65[_0x1411f2(0x21c)]();if(BattleManager[_0x1411f2(0x1e7)][_0x1411f2(0x221)](_0x5dbbba))continue;this[_0x1411f2(0x2e6)](_0x180f65);}for(const _0x5a1111 of this[_0x1411f2(0x2b9)]){if(!_0x5a1111)continue;const _0x5dd208=_0x5a1111[_0x1411f2(0x21c)]();if(BattleManager['_otb_actionBattlersNext'][_0x1411f2(0x221)](_0x5dd208))continue;this[_0x1411f2(0x2e6)](_0x5a1111);}},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x23a)]=function(_0x487ee5,_0x2ad434){const _0x402ca5=_0x205e7a,_0x3fe9c8=_0x2ad434===BattleManager[_0x402ca5(0x1e7)]?this[_0x402ca5(0x2ed)]:this[_0x402ca5(0x2b9)];if(!_0x3fe9c8)return;const _0x53f199=VisuMZ[_0x402ca5(0x10e)][_0x402ca5(0x2e1)](_0x487ee5,_0x2ad434),_0xcbb646=_0x53f199[_0x402ca5(0x20a)]-0x1,_0x34848e=new Sprite_OTB_TurnOrder_Battler(_0x487ee5,_0xcbb646,_0x3fe9c8);this['_spriteContainer'][_0x402ca5(0x282)](_0x34848e),_0x3fe9c8[_0x402ca5(0x178)](_0x34848e),_0x34848e[_0x402ca5(0x114)](0xff),this[_0x402ca5(0x166)]();},Window_OTB_TurnOrder[_0x205e7a(0x1a4)]['addBattlerToTurnOrderAtStart']=function(_0x54e30f,_0x594bc5){const _0x5048fd=_0x205e7a,_0x30fc79=_0x594bc5===BattleManager[_0x5048fd(0x1e7)]?this[_0x5048fd(0x2ed)]:this[_0x5048fd(0x2b9)];if(!_0x30fc79)return;for(const _0x425d1e of _0x30fc79){if(!_0x425d1e)continue;_0x425d1e[_0x5048fd(0x21c)]()===_0x54e30f&&(_0x425d1e['_instance']=_0x425d1e[_0x5048fd(0x1e0)]||0x0,_0x425d1e[_0x5048fd(0x1e0)]++);}const _0x3a41e2=0x0,_0x24cbce=new Sprite_OTB_TurnOrder_Battler(_0x54e30f,_0x3a41e2,_0x30fc79);this[_0x5048fd(0x137)][_0x5048fd(0x282)](_0x24cbce),_0x30fc79['unshift'](_0x24cbce),_0x24cbce[_0x5048fd(0x114)](0xff),_0x24cbce['_positionDuration']=0x258,_0x24cbce['x']=this['_subjectX'],this[_0x5048fd(0x166)]();},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x109)]=function(_0x34e383,_0x457320){const _0x259bb8=_0x205e7a,_0x2b4485=this[_0x259bb8(0x2ed)];if(!_0x2b4485)return;let _0x119903=0x0;for(let _0x244697=0x0;_0x244697<_0x457320;_0x244697++){const _0x5d4122=_0x2b4485[_0x244697];if(!_0x5d4122)continue;if(_0x5d4122[_0x259bb8(0x21c)]()!==_0x34e383)continue;_0x119903=_0x5d4122[_0x259bb8(0x1e0)]+0x1;}for(let _0x2154b0=_0x457320;_0x2154b0<_0x2b4485['length'];_0x2154b0++){const _0x47edb9=_0x2b4485[_0x2154b0];if(!_0x47edb9)continue;if(_0x47edb9['battler']()!==_0x34e383)continue;_0x47edb9['_instance']=_0x47edb9['_instance']||0x0,_0x47edb9[_0x259bb8(0x1e0)]++;}const _0xbca2bb=new Sprite_OTB_TurnOrder_Battler(_0x34e383,_0x119903,_0x2b4485);this[_0x259bb8(0x137)][_0x259bb8(0x282)](_0xbca2bb),_0x2b4485[_0x259bb8(0x2de)](_0x457320,0x0,_0xbca2bb),_0xbca2bb[_0x259bb8(0x114)](0xff),_0xbca2bb['_positionDuration']=0x258,_0xbca2bb['x']=this[_0x259bb8(0x213)],this[_0x259bb8(0x166)]();},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x276)]=function(){const _0x3c5f90=_0x205e7a;this[_0x3c5f90(0x2f1)](BattleManager[_0x3c5f90(0x1e7)],!![]),this['createTurnOrderSprites'](BattleManager['_otb_actionBattlersNext'],!![]),this[_0x3c5f90(0x1f3)](BattleManager[_0x3c5f90(0x30d)],!![]),this['sortContainer']();},Window_OTB_TurnOrder[_0x205e7a(0x1a4)][_0x205e7a(0x19e)]=function(_0x176bcf){const _0x3356e3=_0x205e7a;this[_0x3356e3(0x217)](),_0x176bcf&&_0x176bcf[_0x3356e3(0x2f5)]()!==null&&this['createOrderPreview'](_0x176bcf);},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x217)]=function(){const _0x208d07=_0x205e7a;for(const _0x1fba42 of this[_0x208d07(0x29a)][_0x208d07(0x2d6)]){if(!_0x1fba42)continue;this[_0x208d07(0x2e6)](_0x1fba42);}},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x2fe)]=function(_0x38be9e){const _0x50f871=_0x205e7a,_0x20c677=_0x38be9e[_0x50f871(0x18a)](),_0x4af6be=_0x38be9e[_0x50f871(0x31f)](),_0x3ab0d1=_0x38be9e[_0x50f871(0x2d8)]();_0x4af6be!==0x0&&this[_0x50f871(0x299)](_0x20c677,![],_0x4af6be);_0x3ab0d1!==0x0&&this['createOrderPreviewSprite'](_0x20c677,!![],_0x3ab0d1);if(!_0x38be9e[_0x50f871(0x287)]())return;const _0x4a421e=SceneManager[_0x50f871(0x26e)][_0x50f871(0x12a)],_0x293cc5=SceneManager[_0x50f871(0x26e)]['_enemyWindow'];let _0xc53322=null;if(_0x4a421e&&_0x4a421e[_0x50f871(0x11e)])_0xc53322=_0x4a421e['actor'](_0x4a421e[_0x50f871(0x218)]());else _0x293cc5&&_0x293cc5[_0x50f871(0x11e)]&&(_0xc53322=_0x293cc5[_0x50f871(0x32a)]());if(!_0xc53322)return;const _0x4b500d=_0x38be9e[_0x50f871(0x236)](_0xc53322),_0x5e3ca9=_0x38be9e['otbCalcTargetNextOrderChange'](_0xc53322);_0x4b500d!==0x0&&this[_0x50f871(0x299)](_0xc53322,![],_0x4b500d),_0x5e3ca9!==0x0&&this[_0x50f871(0x299)](_0xc53322,!![],_0x5e3ca9);},Window_OTB_TurnOrder['prototype'][_0x205e7a(0x299)]=function(_0x1ab138,_0x5ef326,_0x3b2a80){const _0x5993c7=_0x205e7a;if(!_0x1ab138)return;if(_0x3b2a80===0x0)return;const _0x433c82=_0x5ef326?BattleManager['_otb_actionBattlersNext']:BattleManager['_actionBattlers'],_0xa12137=VisuMZ['BattleSystemOTB'][_0x5993c7(0x2e1)](_0x1ab138,_0x433c82),_0x2bda98=_0x5ef326?this[_0x5993c7(0x2b9)]:this[_0x5993c7(0x2ed)],_0x373b54=_0x5ef326?this[_0x5993c7(0x305)]:this[_0x5993c7(0x233)];if(_0xa12137[_0x5993c7(0x20a)]<=0x0)return;for(let _0xa69094=0x0;_0xa69094<_0xa12137[_0x5993c7(0x20a)];_0xa69094++){const _0x357260=new Sprite_OTB_TurnOrder_Preview(_0x1ab138,_0xa69094,_0x2bda98,_0x3b2a80);this[_0x5993c7(0x29a)][_0x5993c7(0x282)](_0x357260),_0x373b54[_0x5993c7(0x178)](_0x357260),_0x357260[_0x5993c7(0x147)](),_0x357260[_0x5993c7(0x114)](0xff);}};