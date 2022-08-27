<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_faq
 *
 * @copyright   (C) 2022 Md Siddiqur Rahman
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

$faqs = $params->get('advance_faq');

$data = [];
foreach ($faqs as $faq)
{
    $items = [
        "@type" => "Question",
        "name" => $faq->question,
        "acceptedAnswer" => [
            "@type" =>  "Answer",
            "text" => $faq->answer,
        ]
    ];
    array_push($data, $items);
}

require ModuleHelper::getLayoutPath('mod_faq', $params->get('layout', 'default'));
