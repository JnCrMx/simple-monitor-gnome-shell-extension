const GETTEXT_DOMAIN = 'simple-monitor@JnCrMx.github.io';

import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class SimpleMonitorPreferences extends ExtensionPreferences {
    constructor(metadata) {
        super(metadata);

        this.initTranslations(GETTEXT_DOMAIN);
    }

    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const appearance = new Adw.PreferencesGroup({
            title: _('Appearance'),
            description: _('Configure the appearance of the extension'),
        });
        page.add(appearance);

        const memPerc = new Adw.SwitchRow({
            title: _('Show memory percentage'),
            subtitle: _('If on, memory usage is shown as percentage of total. If off, it is shown as used GiB'),
        });
        appearance.add(memPerc);
        window._settings.bind('mem-perc', memPerc, 'active', Gio.SettingsBindFlags.DEFAULT);

        const behaviour = new Adw.PreferencesGroup({
            title: _('Behaviour'),
            description: _('Configure the behaviour of the extension'),
        });
        page.add(behaviour);

        const toporPs = new Adw.SwitchRow({
            title: _('Get processes CPU usage from \'top\''),
            subtitle: _('If on, top is used, if of, ps is used. Top gets usage in a short period of time, ps gets cumulative usage since process started'),
        });
        behaviour.add(toporPs);
        window._settings.bind('top-or-ps', toporPs, 'active', Gio.SettingsBindFlags.DEFAULT);

        const secUpdate = new Adw.SpinRow({
            title: _('Update every (Sec)'),
            adjustment: new Gtk.Adjustment({
                lower: 1,
                upper: 10,
                value: 2,
                step_increment: 1,
            }),
        });
        behaviour.add(secUpdate);
        window._settings.bind('sec-update', secUpdate, 'value', Gio.SettingsBindFlags.DEFAULT);
    }
}
