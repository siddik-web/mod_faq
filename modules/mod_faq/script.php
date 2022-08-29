<?php
use Joomla\CMS\Installer\InstallerAdapter;
/**
 * @package     Joomla.Site
 * @subpackage  mod_faq
 *
 * @copyright   (C) 2022 Md Siddiqur Rahman
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

 // No direct access to this file
defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;

/**
 * Script file of Faq module
 * 
 * @since 1.0.0
 */
class ModFaqInstallerScript
{

    /**
     * Extension script constructor.
     *
     * @return void
     *
     * @since 1.0.2
     */
    public function __construct()
    {
        $this->minimumJoomla = '4.0';
        $this->minimumPhp = JOOMLA_MINIMUM_PHP;
    }

    /**
     * Method to install the extension
     *
     * @param   InstallerAdapter  $parent  The class calling this method
     *
     * @return  boolean  True on success
     */
    function install($parent)
    {
        echo Text::_('MOD_FAQ_INSTALLERSCRIPT_INSTALL');

        return true;
    }

    /**
     * Method to uninstall the extension
     *
     * @param   InstallerAdapter  $parent  The class calling this method
     *
     * @return  boolean  True on success
     */
    function uninstall($parent)
    {
        echo Text::_('MOD_FAQ_INSTALLERSCRIPT_UNINSTALL');

        return true;
    }

    /**
     * Method to update the extension
     *
     * @param InstallerAdapter  $parent  The class calling this method
     *
     *
     * @return  boolean True on success
     */
    function update($parent)
    {
        echo Text::_('MOD_FAQ_INSTALLERSCRIPT_UPDATE');

        return true;
    }

    /**
     * Function called before extension installation/update/removal procedure commences
     *
     * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
     * @param   InstallerAdapter  $parent  The class calling this method
     *
     * @return  boolean  True on success
     */
    function preflight($type, $parent) {
        // Check for the minimum PHP version before continuing
        if (!empty($this->minimumPhp) && version_compare(PHP_VERSION, $this->minimumPhp, '<')) {
            Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPhp), Log::WARNING, 'jerror');

            return false;
        }

        // Check for the minimum Joomla version before continuing
        if (!empty($this->minimumJoomla) && version_compare(JVERSION, $this->minimumJoomla, '<')) {
            Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_JOOMLA', $this->minimumJoomla), Log::WARNING, 'jerror');

            return false;
        }
        
        echo Text::_('MOD_FAQ_INSTALLERSCRIPT_PREFLIGHT');
        echo $this->minimumJoomla . ' ' . $this->minimumPhp;

        return true;
    }

    /**
     * Function called after extension installation/update/removal procedure commences
     *
     * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
     * @param   InstallerAdapter  $parent  The class calling this method
     *
     * @return  boolean  True on success
     */
    function postflight($type, $parent)
    {
        echo Text::_('MOD_FAQ_INSTALLERSCRIPT_POSTFLIGHT');

        return true;
    }
}